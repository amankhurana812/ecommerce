import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      'next/core-web-vitals',
      'next/typescript',
      'prettier',
      'plugin:prettier/recommended',
      'plugin:tailwindcss/recommended',
    ],
    rules: {
      '@next/next/no-page-custom-font': 'off',
      // Example auto-fixable rules
      'no-unused-vars': 'warn', // Warns about unused variables
      'no-mixed-spaces-and-tabs': 'error', // Enforces consistent spacing
      semi: ['error', 'always'], // Enforces semicolons at the end of statements
      '@typescript-eslint/no-unused-vars': 'warn', // TypeScript unused vars
      '@typescript-eslint/no-explicit-any': 'off',
    },
    ignorePatterns: [
      '**/node_modules/**',
      '**/dist/**',
      '**/*.js/tsconfig.json',
    ],
    settings: {
      tailwindcss: {
        config: path.join(__dirname, './tailwind.config.ts'),
      },
    },
    // Report unused disable directives if needed
  }),
];

export default eslintConfig;
