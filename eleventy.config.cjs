const path = require("node:path")

module.exports = function (eleventyConfig) {
  /**
   * eleventy dev server
   * @see https://www.11ty.dev/docs/dev-server/
   */
  eleventyConfig.setServerOptions({
    domDiff: false,
    showAllHosts: true,
  })

  /**
   * Ignore Template Files
   * @see https://www.11ty.dev/docs/ignores/
   */
  eleventyConfig.ignores.add("**/README.md")
  eleventyConfig.ignores.add("**/.gitkeep")
  eleventyConfig.ignores.add("**/_drafts/**")

  /**
   * Watch Ignores
   * @see https://www.11ty.dev/docs/watch-serve/
   */
  eleventyConfig.watchIgnores.add("**/*.map")
  eleventyConfig.watchIgnores.add("**/.**")

  /**
   * Passthrough File Copy
   * @see https://www.11ty.dev/docs/copy/
   */
  eleventyConfig.addPassthroughCopy({})

  /**
   * custom filter
   * @see https://www.11ty.dev/docs/filters/
   */
  eleventyConfig.addFilter("urlJoin", function (baseUrl, pathname) {
    return new URL(path.join(baseUrl, pathname)).toString()
  })
  eleventyConfig.addFilter("padStart", function (str = "", length = 2) {
    return String(str).padStart(length, "0")
  })
  eleventyConfig.addFilter("objAssign", function (...args) {
    return Object.assign({}, ...args)
  })

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
