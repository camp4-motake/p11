import { execSync } from 'node:child_process';
import chokidar from 'chokidar';
import { glob } from 'node:fs/promises';

const buildHTML = () => {
  try {
    execSync('npx @11ty/eleventy --incremental', { stdio: 'inherit' });
  } catch (error) {
    console.error('Error running 11ty:', error);
  }
};

const watcher = chokidar.watch(
  await Array.fromAsync(glob('src/**/*.{js,ts,jsx,tsx}'))
);

watcher.on('change', (path) => {
  console.log(`File ${path} has been changed`);
  buildHTML();
});

buildHTML();
console.log('Watching for file changes...');
