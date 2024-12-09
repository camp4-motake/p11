import { execSync } from 'node:child_process';
import { glob } from 'node:fs/promises';
import chokidar from 'chokidar';

const buildHTML = () => {
  try {
    execSync(
      'npx tsx ./node_modules/.bin/eleventy --config=eleventy.config.ts --incremental',
      { stdio: 'inherit' },
    );
  } catch (error) {
    console.error('Error running 11ty:', error);
  }
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
