import { graphql } from 'react-apollo'
import upvotePostGql from './upvotePost.gql'
import Feature from './feature'

const withMutation = graphql(upvotePostGql, {
  props: ({ ownProps, mutate }) => ({
    upvote: (id, votes) =>
      mutate({
        variables: { id, votes },
        optimisticResponse: {
          __typename: 'Mutation',
          updatePost: {
            __typename: 'Post',
            id: ownProps.id,
            votes: ownProps.votes + 1,
          },
        },
      }),
  }),
})

export default withMutation(Feature)
