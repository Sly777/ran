if (process.env.NODE_ENV === 'test') {
  require('./jest.setup.js')
} else {
  require('./storybook.setup.js')
}
