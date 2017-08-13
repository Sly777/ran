module.exports = {
  coverageDirectory: './coverage/',
  collectCoverage: true,
  moduleFileExtensions: ['js', 'json'],
  // moduleNameMapper: {
  //   'next/router': '<rootDir>/app/__mocks__/next-router.js'
  // },
  testRegex: '\\.test\\.js$',
  testPathIgnorePatterns: [
    '<rootDir>/(build|docs|node_modules)/',
    '/__mocks__/'
  ]
}
