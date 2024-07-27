module.exports = function (/* eleventyConfig */) {
  return {
    dir: {
      input: "src/pages",
      output: ".tmp",
      includes: "_includes",
      layouts: "_includes/layouts",
      data: "_data",
    },
  }
}
