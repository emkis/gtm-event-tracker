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
    'arrow-body-style': 'off', // disabled to prevent issue: https://github.com/prettier/eslint-plugin-prettier/issues/65
    'prefer-arrow-callback': 'off', // disabled to prevent issue: https://github.com/prettier/eslint-plugin-prettier/issues/65
    '@typescript-eslint/no-unused-vars': 'off', // disabled because TS is handling this
    '@typescript-eslint/no-unused-params': 'off', // disabled because TS is handling this
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
