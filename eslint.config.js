import js from '@eslint/js';
import globals from 'globals';
import ts from 'typescript-eslint';

/** @type {import('eslint').Linter.Config} */
export default [
  {
    ignores: ['dist/'],
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  ...ts.configs.stylistic,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
];
