import chokidar from 'chokidar';
import { execSync } from 'node:child_process';

const watcher = chokidar.watch('src/**/*.{jsx,tsx}', {
  ignored: /(^|[\/\\])\../,
  persistent: true,
});

execSync('npx @11ty/eleventy --incremental', { stdio: 'inherit' });

watcher.on('change', (path) => {
  console.log(`File ${path} has been changed`);
  try {
    execSync('npx @11ty/eleventy --incremental', { stdio: 'inherit' });
  } catch (error) {
    console.error('Error running 11ty:', error);
  }
});

console.log('Watching for file changes...');
