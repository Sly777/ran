import { graphql } from 'react-apollo'
import getPostGql from './getPost.gql'
import Feature from './feature'

const withData = graphql(getPostGql, {
  options: ({ postId }) => ({
    variables: {
      postId
    }
  }),
  props: ({ data: { loading, Post, error } }) => ({
    loading,
    Post,
    error
  })
})

export default withData(Feature)
