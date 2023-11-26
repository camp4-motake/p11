module.exports = function (eleventyConfig) {
  const { npm_package_config_intermediate, npm_package_config_input } =
    process.env;
  return {
    dir: {
      input: `${npm_package_config_input}views`,
      output: npm_package_config_intermediate,
    },
  };
};
