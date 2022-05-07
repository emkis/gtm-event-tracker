module.exports = {
  env: {
    browser: true,
  },
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    semi: ['error', 'never'],
    'prettier/prettier': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-unused-params': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
  overrides: [
    {
      files: ['**/*.spec.ts', '**/*.test.ts'],
      env: { jest: true, node: true },
    },
  ],
  ignorePatterns: [
    '**/*/node_modules/*',
    '/dist',
    '/temp',
    '/storage',
    '/examples',
  ],
}
