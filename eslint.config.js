/**
 * @antfu/eslint-config
 * @see https://github.com/antfu/eslint-config
 */
import antfu from '@antfu/eslint-config'
import format from 'eslint-plugin-format'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export default antfu(
  {
    formatters: {
      css: true,
      html: true,
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'object-shorthand': ['error', 'always'],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
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
