module.exports = function (/* eleventyConfig */) {
  return {
    dir: {
      input: `${process.env.npm_package_config_input}pages`,
      output: process.env.npm_package_config_intermediate,
      includes: "../components",
      layouts: "../layouts",
      data: "../data",
    },
  }
}
