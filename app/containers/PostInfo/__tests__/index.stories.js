import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { addTypenameToDocument } from 'apollo-client'
import { storiesOf } from '@storybook/react'

import PostInfo from '../'
import PostInfoFeature from '../feature'
import getPostGql from '../getPost.gql'

const query = addTypenameToDocument(getPostGql)

storiesOf('PostInfo', module)
  .add('loading', () => <PostInfoFeature loading />)
  .add('showing post', () => {
    const variables = { postId: 1 }
    const data = {
      Post: {
        title: 'title',
        id: 'id',
        url: 'someurl',
        votes: 1,
        createdAt: new Date(),
        __typename: 'Post',
      },
    }

    const mocks = [{ request: { query, variables }, result: { data } }]

    return (
      <MockedProvider mocks={mocks}>
        <PostInfo />
      </MockedProvider>
    )
  })
// .add('no such post', () => {
//   const variables = { postId: 1 }
//   const data = {
//     error: {
//
//     },
//   }
//
//   const mocks = [{ request: { query, variables }, result: { data } }]
//
//   return (
//     <MockedProvider mocks={mocks}>
//       <PostInfo />
//     </MockedProvider>
//   )
// })
