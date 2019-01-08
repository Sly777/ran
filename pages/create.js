// @flow
import * as React from 'react';
import CreatePost from '../components/CreatePost';
import withData from '../libraries/WithData';
import DefaultCon from '../containers/Default';

export default withData(props => (
  <DefaultCon title="Create Post" {...props}>
    <CreatePost />
  </DefaultCon>
));
