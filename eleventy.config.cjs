module.exports = function (/* eleventyConfig */) {
  return {
    dir: {
      input: "src/pages",
      output: "dist",
      includes: "../components",
      layouts: "../layouts",
      data: "../data",
    },
  }
}
