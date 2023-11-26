import "zx/globals";

const tmpDir = process.env.npm_package_config_intermediate;
const outDir = process.env.npm_package_config_output;

process.env.FORCE_COLOR = "1";

await $`rimraf ${tmpDir} ${outDir}`;

if (argv.watch) {
  // dev
  $`npx @11ty/eleventy --watch`;
  await sleep(1000);
  $`parcel './${tmpDir}**/*.html' --dist-dir ${outDir} --no-cache`;
} else {
  // build
  await $`npx @11ty/eleventy`;
  await $`parcel build './${tmpDir}**/*.html' --dist-dir ${outDir} --no-cache --no-source-maps`;
}
