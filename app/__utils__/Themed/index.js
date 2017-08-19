if (process.env.NODE_ENV === 'test') {
  module.exports = require('./jest.js')
} else {
  module.exports = require('./storybook.js')
}
