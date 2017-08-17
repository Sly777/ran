if (process.env.NODE_ENV === 'test') {
  require('./jest.js')
} else {
  require('./storybook.js')
}
