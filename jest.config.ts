const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.(spec|test).ts'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/middlewares/errorHandler.ts',
    '<rootDir>/dist',
  ],
  testTimeout: 30000,
}

export default config
