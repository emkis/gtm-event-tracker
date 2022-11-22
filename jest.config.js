/** @type {import('@jest/types').Config.InitialOptions} */

module.exports = {
  testEnvironment: 'jsdom',
  clearMocks: true,
  setupFiles: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(test).[jt]s?(x)'],
  modulePathIgnorePatterns: ['<rootDir>/dist', '<rootDir>/node_modules'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^lodash-es$': 'lodash',
  },
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['html-spa', 'json'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/api-report',
    '<rootDir>/dist',
  ],
}
