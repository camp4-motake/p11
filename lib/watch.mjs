import { execSync } from 'node:child_process';
import { glob } from 'node:fs/promises';
import chokidar from 'chokidar';

const buildHTML = () => {
  execSync('pnpm exec eleventy --config=eleventy.config.ts --incremental', {
    stdio: 'inherit',
  });
};

const watcher = chokidar.watch(
  await Array.fromAsync(glob('src/**/*.{js,ts,jsx,tsx}')),
);

watcher.on('change', (path) => {
  console.log(`File ${path} has been changed`);
  buildHTML();
});

buildHTML();
console.log('Watching for file changes...');
