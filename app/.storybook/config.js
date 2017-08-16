import { configure, addDecorator } from '@storybook/react'
import centered from '@storybook/addon-centered'

import '~/__utils__/setup'

// settings
addDecorator(centered)

// load
const req = require.context('../', true, /stories.jsx?$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
