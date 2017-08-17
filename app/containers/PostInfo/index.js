import { graphql } from 'react-apollo'
import getPostGql from './getPost.gql'
import Feature from './feature'

const withData = graphql(getPostGql, {
  options: ctx => {
    const { postId } = ctx
    console.log('options =', ctx)
    return {
      variables: {
        postId,
      },
    }
  },
  props: ctx => {
    console.log('props = ', ctx)
    const { data: { loading, Post, error } } = ctx
    return {
      loading,
      Post,
      error,
    }
  },
})

export default withData(Feature)
