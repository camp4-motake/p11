import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDirectory = path.join(__dirname, '../dist');

async function convertToRelativePath(htmlContent, filePath, targetDirectory) {
  const srcHrefRegex = /(?<=src="|href=")\/(?!\/)[^"']*/g;
  let replaceHtml;
  replaceHtml = htmlContent.replace(srcHrefRegex, (match) => {
    const absolutePath = path.join('/', match);
    const relativePath = path.relative(
      path.dirname(filePath),
      path.join(targetDirectory, absolutePath),
    );
    return relativePath.replace(/\\/g, '/');
  });

  const srcsetRegex = /(?<=srcset=")([^"]*)/g;
  replaceHtml = htmlContent.replace(srcsetRegex, (match) => {
    return match
      .split(',')
      .map((src) => {
        const [url, size] = src.trim().split(/\s+/);
        if (url.startsWith('/')) {
          const absolutePath = path.join('/', url);
          const relativePath = path.relative(
            path.dirname(filePath),
            path.join(targetDirectory, absolutePath),
          );
          return `${relativePath.replace(/\\/g, '/')}${size ? ` ${size}` : ''}`;
        }
        return src;
      })
      .join(', ');
  });

  return replaceHtml;
}

async function processHtmlFile(filePath, targetDirectory) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const updatedContent = await convertToRelativePath(
      data,
      filePath,
      targetDirectory,
    );
    await fs.writeFile(filePath, updatedContent, 'utf8');
    // eslint-disable-next-line no-console
    console.log(`Update File: ${filePath}`);
  } catch (err) {
    console.error(`File Processing Error (${filePath}):`, err);
  }
}

async function processDirectory(directory, targetDirectory) {
  try {
    const files = await fs.readdir(directory, { withFileTypes: true });
    for (const file of files) {
      const fullPath = path.join(directory, file.name);
      if (file.isDirectory()) {
        await processDirectory(fullPath, targetDirectory);
      } else if (path.extname(file.name).toLowerCase() === '.html') {
        await processHtmlFile(fullPath, targetDirectory);
      }
    }
  } catch (err) {
    console.error(`Directory Processing Errors (${directory}):`, err);
  }
}

async function main() {
  await processDirectory(targetDirectory, targetDirectory);
  // eslint-disable-next-line no-console
  console.log('All processing is complete.');
}

main().catch((err) => console.error('メイン処理エラー:', err));
