import fs from "fs/promises"
import path from "path"
import crypto from "crypto"
import { fileURLToPath } from "url"
import * as cheerio from "cheerio"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const distDir = path.join(__dirname, "../dist")

async function generateHash(filePath) {
  try {
    const fileBuffer = await fs.readFile(filePath)
    const hashSum = crypto.createHash("md5")
    hashSum.update(fileBuffer)
    return hashSum.digest("hex").slice(0, 8)
  } catch (error) {
    console.error(`Error generating hash for ${filePath}:`, error)
    return "error"
  }
}

async function addHashToPath(filePath, attrPath) {
  if (attrPath && !attrPath.startsWith("http")) {
    const fullPath = path.join(path.dirname(filePath), attrPath)
    const hash = await generateHash(fullPath)
    return `${attrPath}?v=${hash}`
  }
  return attrPath
}

async function processHtmlFile(filePath) {
  const html = await fs.readFile(filePath, "utf-8")
  const $ = cheerio.load(html)

  for (const elem of $('link[rel="stylesheet"]')) {
    const href = $(elem).attr("href")
    $(elem).attr("href", await addHashToPath(filePath, href))
  }

  for (const elem of $("script[src]")) {
    const src = $(elem).attr("src")
    $(elem).attr("src", await addHashToPath(filePath, src))
  }

  for (const elem of $("img[src]")) {
    const src = $(elem).attr("src")
    $(elem).attr("src", await addHashToPath(filePath, src))
  }

  for (const elem of $("source")) {
    const src = $(elem).attr("src")
    if (src) {
      $(elem).attr("src", await addHashToPath(filePath, src))
    }
    const srcset = $(elem).attr("srcset")
    if (srcset) {
      const newSrcset = await Promise.all(
        srcset.split(",").map(async (srcItem) => {
          const [url, descriptor] = srcItem.trim().split(/\s+/)
          const newUrl = await addHashToPath(filePath, url)
          return descriptor ? `${newUrl} ${descriptor}` : newUrl
        })
      )
      $(elem).attr("srcset", newSrcset.join(", "))
    }
  }

  await fs.writeFile(filePath, $.html())
  console.log(`Processed: ${filePath}`)
}

async function processDistDirectory(dir) {
  const files = await fs.readdir(dir)
  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = await fs.stat(filePath)
    if (stat.isDirectory()) {
      await processDistDirectory(filePath)
    } else if (path.extname(file).toLowerCase() === ".html") {
      await processHtmlFile(filePath)
    }
  }
}

processDistDirectory(distDir).catch(console.error)
