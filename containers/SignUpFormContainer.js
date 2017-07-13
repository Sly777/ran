/* eslint-disable */
import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import persist from '../libraries/persist';
import SignUpForm from '../components/SignUpForm';
import { signIn } from '../actions';
import redirect from '../libraries/redirect';

class SignUpFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.props
      .NewUser(values)
      .then(response => {
        if (response.data) {
          this.props.signUpDispatcher(response.data.signinUser.token);
        }
      }).catch(err => {
        this.setState({errors: [err.graphQLErrors[0]]})
      })
  }

  render() {
    return <SignUpForm onSubmit={this.handleSubmit} errors={this.state.errors} />;
  }
}

const signUpMutation = gql`
  mutation NewUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      authProvider: { email: { email: $email, password: $password } }
    ) {
      id
    }
    signinUser(email: { email: $email, password: $password }) {
      token
    }
  }
`;

const SignUpWithData = graphql(signUpMutation, {
  props: ({ mutate }) => ({
    NewUser: ({ firstName, lastName, email, password }) =>
      mutate({
        variables: { firstName, lastName, email, password }
      })
  })
})(SignUpFormContainer);

const mapDispatchToProps = dispatch => ({
  signUpDispatcher(token) {
    persist.willSetAccessToken(token);
    dispatch(signIn(token));
  }
});

const SignUpWithDataAndDispatch = connect(null, mapDispatchToProps)(
  SignUpWithData
);

SignUpFormContainer.propTypes = {
  NewUser: PropTypes.func,
};

export default SignUpWithDataAndDispatch;
