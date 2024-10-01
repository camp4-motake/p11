/** @type {import('prettier').Config} */
export default {
  plugins: [
    'prettier-plugin-css-order',
    'prettier-plugin-organize-imports',
    'prettier-plugin-jinja-template',
  ],
  singleQuote: true,
  organizeImportsSkipDestructiveCodeActions: true,
  overrides: [
    {
      files: '*.njk',
      options: {
        printWidth: 100,
        parser: 'jinja-template',
      },
    },
  ],
};
