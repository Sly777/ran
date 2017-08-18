module.exports = {
  coverageDirectory: './coverage/',
  collectCoverage: true,
  moduleFileExtensions: ['js', 'json'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupTestFrameworkScriptFile: '<rootDir>/app/__utils__/setup/index.js',
  testRegex: '\\.test\\.js$',
  testPathIgnorePatterns: [
    '<rootDir>/(build|docs|node_modules)/',
    '/__mocks__/',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/app/__mocks__/fileMock.js',
  },
}
