import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { dispatchers } from '~/stores/auth'
import createUserGql from './signupUser.gql'
import Feature from './feature'

const withMutation = graphql(createUserGql, {
  props: ({ mutate }) => ({
    mutations: {
      signUp: ({ firstName, lastName, email, password }) =>
        mutate({
          variables: { firstName, lastName, email, password },
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
