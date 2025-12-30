import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execPromise = promisify(exec);

const tasks = [
  `pnpm dlx js-beautify@latest './dist/**/*.html' --indent-size 2 --no-preserve-newlines --end-with-newline false --extra-liners "" --unformatted "script,style,svg,noscript" --replace`,
  'node lib/replaceRelativePath.ts',
  'node lib/renameAssets.ts',
];

async function runCommands() {
  try {
    for (const task of tasks) {
      const { stdout: output } = await execPromise(task);
      console.log(output);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

runCommands();
