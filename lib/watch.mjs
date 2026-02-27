import { execSync } from 'node:child_process';
import { glob } from 'node:fs/promises';
import chokidar from 'chokidar';

const buildHTML = (incremental = false) => {
  const cmd = `pnpm exec eleventy --config=eleventy.config.ts${incremental ? ' --incremental' : ''}`;
  execSync(cmd, { stdio: 'inherit' });
};

const watcher = chokidar.watch(
  await Array.fromAsync(glob('src/**/*.{js,ts,jsx,tsx}')),
);

watcher.on('change', (path) => {
  console.log(`File ${path} has been changed`);
  const incremental =
    path.startsWith('src/views/') || path.startsWith('src\\views\\');
  buildHTML(incremental);
});

buildHTML();
console.log('Watching for file changes...');
