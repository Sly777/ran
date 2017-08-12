import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs'

import './__mocks__/router.mock'
import LinkList from '../'
import { themeDecorator } from './utils'

storiesOf('LinkList', module)
  .addDecorator(storyFn => {
    const themes = ['main', 'eightbit', 'inverted']
    const defaultTheme = themes[0]
    const name = select('Theme', themes, defaultTheme)

    return themeDecorator(name)(storyFn())
  })
  .addDecorator(withKnobs)
  .add('authenticated', () =>
    <LinkList
      pathname={text('Pathname', '/')}
      authenticated={boolean('Authenticated', true)}
      logout={action('logout')}
    />
  )
  .add('nonauthenticated', () =>
    <LinkList
      pathname={text('Pathname', '/')}
      authenticated={boolean('Authenticated', false)}
      logout={action('logout')}
    />
  )
