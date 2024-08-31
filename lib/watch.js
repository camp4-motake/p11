import { execSync } from 'node:child_process';
import chokidar from 'chokidar';

const watcher = chokidar.watch(
  ['src/**/*.{jsx,tsx}', 'src/_data/**/*.{js,ts}'],
  {
    ignored: /(^|[\/\\])\../,
    persistent: true,
  },
);

watcher.on('change', (path) => {
  console.log(`File ${path} has been changed`);
  try {
    execSync('npx @11ty/eleventy --incremental', { stdio: 'inherit' });
  } catch (error) {
    console.error('Error running 11ty:', error);
  }
});

execSync('npx @11ty/eleventy --incremental', { stdio: 'inherit' });
console.log('Watching for file changes...');
