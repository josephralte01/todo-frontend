const { FlatCompat } = require('@eslint/eslintrc');
const path = require('path');

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      'eslint.config.cjs',
    ],
  },

  {
    rules: {
      // Core relaxations
      'no-console': 'warn',
      'no-debugger': 'warn',

      // TypeScript relaxations
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',

      // Optional styling
      'react/react-in-jsx-scope': 'off', // Not needed in Next.js
    },
  },
];
