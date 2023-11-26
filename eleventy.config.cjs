module.exports = function (/* eleventyConfig */) {
  return {
    dir: {
      input: `${process.env.npm_package_config_input}views`,
      output: process.env.npm_package_config_intermediate,
    },
  }
}
