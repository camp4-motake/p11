import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function replaceAssetPaths(filePath, newBasePath) {
  try {
    let content = await fs.readFile(filePath, 'utf8');

    // src, href 属性の置換
    content = content.replace(
      /(src|href)=(["'])(\/assets\/[^"']*)(["'])/g,
      `$1=$2${newBasePath}$3$4`,
    );

    // srcset 属性の置換
    content = content.replace(
      /srcset=(["'])((?:\/assets\/[^"'\s,]+(?:\s+\d+[wx])?,?\s*)+)(["'])/g,
      (match, p1, p2, p3) => {
        const replacedSrcset = p2.replace(
          /\/assets\//g,
          `${newBasePath.replace(/\/$/, '')}/assets/`,
        );
        return `srcset=${p1}${replacedSrcset}${p3}`;
      },
    );

    // style 属性内の url() の置換
    content = content.replace(
      /style=(["'])([^"']*url\(["']?)(\/assets\/[^"')]+)(["']?\))/g,
      `style=$1$2${newBasePath}$3$4`,
    );

    await fs.writeFile(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err);
  }
}

async function processDirectory(directory, newBasePath) {
  try {
    const files = await fs.readdir(directory, { withFileTypes: true });
    for (const file of files) {
      const fullPath = path.join(directory, file.name);
      if (file.isDirectory()) {
        await processDirectory(fullPath, newBasePath);
      } else if (file.name.endsWith('.html')) {
        await replaceAssetPaths(fullPath, newBasePath);
      }
    }
  } catch (err) {
    console.error(`Error processing directory ${directory}:`, err);
  }
}

async function main() {
  // コマンドライン引数からターゲットディレクトリと新しいベースパスを取得
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error(
      'Usage: node replace-assets.mjs <target-directory> <new-base-path>',
    );
    process.exit(1);
  }

  const targetDirectory = path.resolve(__dirname, args[0]);
  const newBasePath = args[1];

  try {
    await processDirectory(targetDirectory, newBasePath);
    console.log('Processing complete.');
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
