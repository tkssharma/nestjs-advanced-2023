module.exports = {
  setupFiles: ["<rootDir>/test/setEnvVars.js"],
  silent: false,
  moduleFileExtensions: ["js", "ts"],
  rootDir: ".",
  testRegex: "[.](spec|test).ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  coverageDirectory: "./coverage",
  testEnvironment: "node",
  roots: ["<rootDir>/"],
};
