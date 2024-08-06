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
};
