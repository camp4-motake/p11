module.exports = function (/* eleventyConfig */) {
  return {
    dir: {
      input: "src/pages",
      output: ".tmp",
      includes: "../components",
      layouts: "../layouts",
      data: "../data",
    },
  }
}
