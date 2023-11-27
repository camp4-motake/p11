/* eslint-disable no-undef */
import "zx/globals"

const tmpDir = process.env.npm_package_config_intermediate
const outDir = process.env.npm_package_config_output

process.env.FORCE_COLOR = "1"

await $`rimraf ${tmpDir} ${outDir}`

if (argv.watch) {
  await $`concurrently 'npx @11ty/eleventy --watch' 'npm:delay && parcel "./${tmpDir}**/*.html" --dist-dir ${outDir} --no-cache'`
} else {
  await $`npx @11ty/eleventy`
  await $`parcel build './${tmpDir}**/*.html' --dist-dir ${outDir} --no-cache --no-source-maps`
}
