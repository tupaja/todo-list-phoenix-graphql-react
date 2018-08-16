// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  moduleDirectories: [
    "node_modules",
    "js"
  ],
  setupTestFrameworkScriptFile: "<rootDir>/js/tests/setup.js",
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!(react-apollo)/)"
  ]
};
