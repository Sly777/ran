module.exports = {
  coverageDirectory: './coverage/',
  collectCoverage: false,
  moduleFileExtensions: ['js'],
  testRegex: '\\.test\\.js$',
  testPathIgnorePatterns: [
    '<rootDir>/(build|docs|node_modules)/',
    '/__mocks__/'
  ]
};
