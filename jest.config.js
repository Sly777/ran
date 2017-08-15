module.exports = {
  coverageDirectory: './coverage/',
  collectCoverage: true,
  moduleFileExtensions: ['js', 'json'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupTestFrameworkScriptFile: '<rootDir>/app/__utils__/setup.js',
  testRegex: '\\.test\\.js$',
  testPathIgnorePatterns: [
    '<rootDir>/(build|docs|node_modules)/',
    '/__mocks__/'
  ]
}
