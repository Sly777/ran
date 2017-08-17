import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { text, boolean } from '@storybook/addon-knobs'

import Layout from '~/__utils__/Layout'
import LinkList from '../'

storiesOf('LinkList', module)
  .add('authenticated', () =>
    <Layout>
      <LinkList
        pathname={text('Pathname', '/')}
        authenticated={boolean('Authenticated', true)}
        logout={action('logout')}
      />
    </Layout>
  )
  .add('nonauthenticated', () =>
    <Layout>
      <LinkList
        pathname={text('Pathname', '/')}
        authenticated={boolean('Authenticated', false)}
        logout={action('logout')}
      />
    </Layout>
  )
