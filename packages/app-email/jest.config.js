// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
const base = require("../../jest.config.js");

module.exports = {
  ...base,
  rootDir: "./build",
  name: "drivers",
  displayName: "@cdc3/drivers",
  collectCoverage: true,
  verbose: true,
  coverageThreshold: {
    global: {
      statements: 5,
      branches: 5,
      functions: 5,
      lines: 5,
    },
  },
};
