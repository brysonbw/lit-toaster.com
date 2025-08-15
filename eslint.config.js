import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import liteslint from 'eslint-plugin-lit';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import jsdoc from 'eslint-plugin-jsdoc';
import globals from 'globals';

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  jsdoc.configs['flat/recommended-error'],
  eslintPluginPrettierRecommended,
  liteslint.configs['flat/recommended'],
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    plugins: { jsdoc },
    rules: {
      // Prettier
      'prettier/prettier': 'error',
      // Typescript
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/prefer-for-of': 'off',
      // Lit
      'lit/no-legacy-template-syntax': 'error',
      'lit/no-template-arrow': 'off',
      // JSDoc
      'jsdoc/require-description': 'off',
      'jsdoc/require-property-description': 'off',
      'jsdoc/require-param-description': 'off',
      'jsdoc/require-returns-description': 'off',
      'jsdoc/require-returns': 'off',
      'jsdoc/require-param-type': 'off',
    },
  },
  {
    files: ['tests/**/*.{js,ts}'],
    rules: {},
  },
];
