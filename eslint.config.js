/**
 * @antfu/eslint-config
 * @see https://github.com/antfu/eslint-config
 */
import antfu from '@antfu/eslint-config'
import format from 'eslint-plugin-format'

export default antfu(
  {
    formatters: {
      css: true,
      html: true,
    },
  },
  {
    files: ['**/*.{js,mjs,jsx,ts,tsx}'],
    rules: { 'object-shorthand': ['error', 'always'] },
  },
  {
    files: ['**/*.njk'],
    plugins: { format },
    languageOptions: { parser: format.parserPlain },
    rules: {
      'format/prettier': ['error', {
        plugins: ['prettier-plugin-jinja-template'],
        parser: 'jinja-template',
        printWidth: 100,
      }],
    },
  },
)
