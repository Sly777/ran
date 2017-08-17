import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { addTypenameToDocument } from 'apollo-client'
import { storiesOf } from '@storybook/react'

import PostInfo from '../'
import PostInfoWithoutData from '../feature'
import getPostGql from '../getPost.gql'

const query = addTypenameToDocument(getPostGql)

storiesOf('PostInfo', module)
  .add('loading', () => <PostInfo loading />)
  .add('showing post', () => {
    const variables = { postId: 1 }
    const data = {
      Post: {
        title: 'title',
        id: 'id',
        url: 'someurl',
      },
    }

    const mocks = [{ request: { query, variables }, result: { data } }]

    return (
      <MockedProvider mocks={mocks}>
        <PostInfo {...variables} />
      </MockedProvider>
    )
  })
