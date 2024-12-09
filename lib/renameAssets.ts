import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '../dist');

// HTMLファイルを再帰的に検索する関数
async function findHtmlFiles(dir: string): Promise<string[]> {
  const files = await fs.readdir(dir, { withFileTypes: true });
  const htmlFiles: string[] = [];

  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      htmlFiles.push(...(await findHtmlFiles(fullPath)));
    } else if (file.name.endsWith('.html')) {
      htmlFiles.push(fullPath);
    }
  }
  return htmlFiles;
}

async function renameAssets() {
  try {
    // assetsディレクトリ内のファイルを取得
    const assetsDir = path.join(distDir, 'assets');
    const files = await fs.readdir(assetsDir);
    const renameMapping = new Map<string, string>();

    // ファイル名の変更とマッピングの作成
    for (const file of files) {
      if (file.startsWith('index')) {
        const ext = path.extname(file);
        const baseNameWithoutExt = path.basename(file, ext);

        let newName: string;

        // ハッシュが存在する場合と存在しない場合を処理
        if (baseNameWithoutExt.includes('.')) {
          // index.{hash}.{ext} -> main.{hash}.{ext}
          const [, hash] = baseNameWithoutExt.split('.');
          newName = `main.${hash}${ext}`;
        } else {
          // index.{ext} -> main.{ext}
          newName = `main${ext}`;
        }

        await fs.rename(
          path.join(assetsDir, file),
          path.join(assetsDir, newName),
        );

        renameMapping.set(file, newName);
      }
    }

    // すべてのHTMLファイルを検索して更新
    const htmlFiles = await findHtmlFiles(distDir);

    for (const htmlPath of htmlFiles) {
      let htmlContent = await fs.readFile(htmlPath, 'utf8');

      // すべての置換対象ファイル名について処理
      for (const [oldName, newName] of renameMapping) {
        htmlContent = htmlContent.replace(
          new RegExp(oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
          newName,
        );
      }

      await fs.writeFile(htmlPath, htmlContent);
    }

    console.log('Asset renaming completed successfully!');
  } catch (error) {
    console.error('Error during asset renaming:', error);
    process.exit(1);
  }
}

// スクリプトの実行
renameAssets();