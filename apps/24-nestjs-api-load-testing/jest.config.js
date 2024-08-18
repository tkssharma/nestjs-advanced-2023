// jest.config.js
module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['/**/*.spec.ts'],
  transform: {
    '^.+.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@react-dnd|react-dnd|dnd-core|react-dnd-html5-backend)',
  ],
  moduleNameMapper: {
    '^@domain(.*)$': '<rootDir>/src/app/domain/$1',
    '^@core(.*)$': '<rootDir>/src/app/core/$1',
    '^@lib(.*)$': '<rootDir>/src/lib/$1',
    '^@auth(.*)$': '<rootDir>/src/auth/$1',
    '^@db(.*)$': '<rootDir>/src/db/$1',
    '^@logger(.*)$': '<rootDir>/src/logger/$1',
    '^@config(.*)$': '<rootDir>/src/config/$1',
    '^@swagger(.*)$': '<rootDir>/src/swagger/$1',
  },
};
