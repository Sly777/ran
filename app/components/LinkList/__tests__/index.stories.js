import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { text, boolean } from '@storybook/addon-knobs'

import Themed from '~/__utils__/Themed'
import LinkList from '../'

storiesOf('LinkList', module)
  .add('authenticated', () =>
    <Themed>
      <LinkList
        pathname={text('Pathname', '/')}
        authenticated={boolean('Authenticated', true)}
        logout={action('logout')}
      />
    </Themed>
  )
  .add('nonauthenticated', () =>
    <Themed>
      <LinkList
        pathname={text('Pathname', '/')}
        authenticated={boolean('Authenticated', false)}
        logout={action('logout')}
      />
    </Themed>
  )
