// @flow
import * as React from 'react';
import { withRouter } from 'next/router';
import PostInfo from '../components/ErrorQuery';
import withData from '../libraries/withData';
import DefaultCon from '../containers/Default';

export default withData(
  withRouter(props => (
    <DefaultCon
      title={decodeURIComponent(props.router.url.query.postTitle)}
      {...props}
    >
      <PostInfo
        postId={props.router.url.query.postId}
        postTitle={props.router.url.query.postTitle}
      />
    </DefaultCon>
  ))
);
