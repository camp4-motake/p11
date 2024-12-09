import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execPromise = promisify(exec);

const tasks = [
  `npx prettier './dist/**/*.html' --ignore-path /dev/null --print-width 256 --write`,
  'node lib/replaceRelativePath.js', // WORKAROUND
  'node lib/renameAssets.js', // WORKAROUND
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
