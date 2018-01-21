// @flow
import * as React from 'react';
import SignInForm from '../components/SignInForm';
import withData from '../libraries/withData';
import DefaultCon from '../containers/Default';

export default withData(props => (
  <DefaultCon title="Sign In" {...props}>
    <SignInForm />
  </DefaultCon>
));
