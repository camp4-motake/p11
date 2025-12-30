import { promises as fs } from 'node:fs';
import type { Dirent } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const targetDirectory = path.join(__dirname, '../dist');

// Helper function to convert a path to a relative path
const toRelativePath = (
  filePath: string,
  targetDir: string,
  urlPath: string,
): string => {
  // すでに相対パスやURLの場合はスキップ
  if (!urlPath.startsWith('/')) return urlPath;

  // Webのルート相対パス (/) をファイルシステムの絶対パスに変換
  const absolutePathOnDisk = path.join(targetDir, urlPath);

  // HTMLファイルのあるディレクトリからの相対パスを計算
  let relativePath = path
    .relative(path.dirname(filePath), absolutePathOnDisk)
    .replace(/\\/g, '/');

  // カレントディレクトリの場合は ./ を付与、そうでなければそのまま (../ 等)
  if (!relativePath.startsWith('.')) {
    relativePath = `./${relativePath}`;
  }

  return relativePath;
};

// Function to process the value of the srcset attribute
const processSrcSet = (
  srcset: string,
  filePath: string,
  targetDir: string,
): string => {
  return srcset
    .split(',')
    .map((src: string) => {
      const [url, size] = src.trim().split(/\s+/) as [
        string,
        string | undefined,
      ];
      if (!url.startsWith('/')) return src;

      const relativePath = toRelativePath(filePath, targetDir, url);
      return `${relativePath}${size ? ` ${size}` : ''}`;
    })
    .join(', ');
};

// Function to convert paths in HTML content
async function convertPaths(
  htmlContent: string,
  filePath: string,
  targetDir: string,
): Promise<string> {
  let html = htmlContent;

  // Processing src and href attributes (supporting both " and ')
  html = html.replace(/(?<=src=["']|href=["'])\/(?!\/)[^"'\s>]+/g, (match: string) =>
    toRelativePath(filePath, targetDir, match),
  );

  // Processing srcset attribute
  html = html.replace(/(?<=srcset=["'])([^"']*)/g, (match: string) =>
    processSrcSet(match, filePath, targetDir),
  );

  return html;
}

// file-handling function
async function processFile(filePath: string, targetDir: string): Promise<void> {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const updatedContent = await convertPaths(content, filePath, targetDir);
    await fs.writeFile(filePath, updatedContent, 'utf8');
    console.log(`Updated: ${filePath}`);
  } catch (err) {
    console.error(
      `Error processing ${filePath}:`,
      err instanceof Error ? err.message : err,
    );
  }
}

// Function to recursively process directories
async function processDirectory(dir: string, targetDir: string): Promise<void> {
  try {
    const entries: Dirent[] = await fs.readdir(dir, { withFileTypes: true });

    await Promise.all(
      entries.map(async (entry: Dirent) => {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          return processDirectory(fullPath, targetDir);
        }

        if (path.extname(entry.name).toLowerCase() === '.html') {
          return processFile(fullPath, targetDir);
        }
      }),
    );
  } catch (err) {
    console.error(
      `Error processing directory ${dir}:`,
      err instanceof Error ? err.message : err,
    );
  }
}

// main executable function
processDirectory(targetDirectory, targetDirectory)
  .then(() => console.log('All processing is complete.'))
  .catch((err: unknown) =>
    console.error('Error occurred:', err instanceof Error ? err.message : err),
  );
