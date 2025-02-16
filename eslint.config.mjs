import nextPlugin from '@next/eslint-plugin-next';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [
  // Config for JavaScript files
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    ignores: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      '@next/next/no-html-link-for-pages': ['error', 'src/app'],
      '@next/next/no-img-element': 'error',
      '@next/next/no-sync-scripts': 'error',
      '@next/next/google-font-display': 'error',
      '@next/next/google-font-preconnect': 'error',
      '@next/next/next-script-for-ga': 'error',
      '@next/next/no-page-custom-font': 'error',
      '@next/next/no-title-in-document-head': 'error',
      '@next/next/no-unwanted-polyfillio': 'error',
    },
  },
  // Config for TypeScript files
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      '@next/next': nextPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...typescriptPlugin.configs['recommended'].rules,
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@next/next/no-html-link-for-pages': ['error', 'src/app'],
      '@next/next/no-img-element': 'warn',
      '@next/next/no-sync-scripts': 'error',
      '@next/next/google-font-display': 'error',
      '@next/next/google-font-preconnect': 'error',
      '@next/next/next-script-for-ga': 'error',
      '@next/next/no-page-custom-font': 'error',
      '@next/next/no-title-in-document-head': 'error',
      '@next/next/no-unwanted-polyfillio': 'error',
    },
  },
];

export default config;
