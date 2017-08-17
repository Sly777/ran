import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { dispatchers } from '~/stores/auth'
import signInGql from './signinUser.gql'
import Feature from './feature'

const withMutation = graphql(signInGql, {
  props: ({ mutate }) => ({
    mutations: {
      signIn: ({ email, password }) =>
        mutate({
          variables: { email, password },
        }),
    },
  }),
})

const mapDispatchToProps = dispatch => ({
  actions: {
    signIn(token) {
      dispatch(dispatchers.signIn(token))
    },
  },
})

const featureWithApollo = withMutation(Feature)
export default connect(null, mapDispatchToProps)(featureWithApollo)
