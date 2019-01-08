// @flow
import * as React from 'react';
import ErrorQuery from '../components/ErrorQuery';
import withData from '../libraries/WithData';
import DefaultCon from '../containers/Default';

export default withData(props => (
  <DefaultCon {...props}>
    <ErrorQuery />
  </DefaultCon>
));
