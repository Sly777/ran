import React from 'react'
import { storiesOf } from '@storybook/react'

import PostInfo from '../feature'
import Themed from '~/__utils__/Themed'

storiesOf('PostInfo', module)
  .add('loading', () => <PostInfo loading />)
  .add('showing post', () => {
    const data = {
      loading: false,
      Post: {
        title: 'Hello World',
        id: 'uuidv4',
        url: 'http://bogus.com',
        votes: 1,
        createdAt: new Date(0)
      }
    }

    return (
      <Themed>
        <PostInfo {...data} />
      </Themed>
    )
  })
  .add('no post', () => {
    const data = {
      loading: false,
      Post: null
    }

    return (
      <Themed>
        <PostInfo {...data} />
      </Themed>
    )
  })
