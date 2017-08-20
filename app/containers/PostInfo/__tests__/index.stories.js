import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { addTypenameToDocument } from 'apollo-client'
import { storiesOf } from '@storybook/react'

import PostInfoWithData from '../'
import PostInfo from '../feature'
import getPostGql from '../getPost.gql'
import Themed from '~/__utils__/Themed'

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
        votes: 1,
        createdAt: Date.now(),
        __typename: 'Post'
      }
    }

    const mocks = [{ request: { query, variables }, result: { data } }]

    return (
      <MockedProvider mocks={mocks}>
        <Themed>
          <PostInfoWithData />
        </Themed>
      </MockedProvider>
    )
  })
  .add('no such post error', () => {
    const variables = { postId: 1 }
    const data = {
      Post: null
    }

    const mocks = [{ request: { query, variables }, result: { data } }]

    return (
      <MockedProvider mocks={mocks}>
        <Themed>
          <PostInfoWithData />
        </Themed>
      </MockedProvider>
    )
  })
