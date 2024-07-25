// jest.config.js
module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['/**/*.spec.ts'],
  transform: {
    '^.+.ts?$': 'ts-jest',
  },
};
