import { promises as fs } from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const targetDirectory = path.join(__dirname, "../dist") // 処理したいディレクトリのパスを指定

async function convertToRelativePath(htmlContent, filePath, targetDirectory) {
  // src と href 属性の変換
  const srcHrefRegex = /(?<=src="|href=")\/(?!\/)[^"']*/g
  htmlContent = htmlContent.replace(srcHrefRegex, (match) => {
    const absolutePath = path.join("/", match)
    let relativePath = path.relative(
      path.dirname(filePath),
      path.join(targetDirectory, absolutePath),
    )
    relativePath = relativePath.replace(/\\/g, "/")
    return relativePath.startsWith(".") ? relativePath : `./${relativePath}`
  })

  // srcset 属性の変換
  const srcsetRegex = /(?<=srcset=")([^"]*)/g
  htmlContent = htmlContent.replace(srcsetRegex, (match) => {
    return match
      .split(",")
      .map((src) => {
        const [url, size] = src.trim().split(/\s+/)
        if (url.startsWith("/")) {
          const absolutePath = path.join("/", url)
          let relativePath = path.relative(
            path.dirname(filePath),
            path.join(targetDirectory, absolutePath),
          )
          relativePath = relativePath.replace(/\\/g, "/")
          relativePath = relativePath.startsWith(".")
            ? relativePath
            : `./${relativePath}`
          return `${relativePath}${size ? " " + size : ""}`
        }
        return src
      })
      .join(", ")
  })

  return htmlContent
}

// 他の関数は変更なし

async function processHtmlFile(filePath, targetDirectory) {
  try {
    const data = await fs.readFile(filePath, "utf8")
    const updatedContent = await convertToRelativePath(
      data,
      filePath,
      targetDirectory,
    )
    await fs.writeFile(filePath, updatedContent, "utf8")
    // eslint-disable-next-line no-console
    console.log(`Update File: ${filePath}`)
  } catch (err) {
    console.error(`File Processing Error (${filePath}):`, err)
  }
}

async function processDirectory(directory, targetDirectory) {
  try {
    const files = await fs.readdir(directory, { withFileTypes: true })
    for (const file of files) {
      const fullPath = path.join(directory, file.name)
      if (file.isDirectory()) {
        await processDirectory(fullPath, targetDirectory)
      } else if (path.extname(file.name).toLowerCase() === ".html") {
        await processHtmlFile(fullPath, targetDirectory)
      }
    }
  } catch (err) {
    console.error(`Directory Processing Errors (${directory}):`, err)
  }
}

// メイン処理
async function main() {
  await processDirectory(targetDirectory, targetDirectory)
  // eslint-disable-next-line no-console
  console.log("All processing is complete.")
}

main().catch((err) => console.error("メイン処理エラー:", err))
