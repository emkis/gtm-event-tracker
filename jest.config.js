/** @type {import('@jest/types').Config.InitialOptions} */

module.exports = {
  testEnvironment: 'jsdom',
  clearMocks: true,
  setupFiles: ['<rootDir>/jest.setup.js'],
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test|tests).[jt]s?(x)',
  ],
  modulePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '@mocks/(.*)$': '<rootDir>/src/__mocks__/$1',
  },
}
