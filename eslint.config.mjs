import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

/**
 * eslint-config-next 16 udostepnia gotowa konfiguracje flat,
 * wiec nie potrzeba warstwy zgodnosci FlatCompat.
 */
const eslintConfig = [
  {
    ignores: ['out/**', '.next/**', 'node_modules/**', 'legacy/**', 'next-env.d.ts'],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // Static export nie ma optymalizatora obrazow - <img> z gotowymi
      // wariantami AVIF/WebP jest tu swiadomym wyborem.
      '@next/next/no-img-element': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
];

export default eslintConfig;
