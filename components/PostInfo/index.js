// @flow
import * as React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Section, A } from './styles';
import connect from './store';

type Props = {
  loading: boolean,
  Post?: Post,
  error?: string,
  postId: string,
  postName: string
};

const PostInfo = ({ loading, Post, error }: Props) => {
  if (loading) {
    return (
      <Section>
        <h1>Loading...</h1>
      </Section>
    );
  }

  if (error) {
    console.log(error); // eslint-disable-line no-console
    window.alert('Load error, check console'); // eslint-disable-line no-alert
    return;
  }

  return (
    <Section>
      <h1>{Post && Post.title}</h1>
      <div>
        <span>
          ID: <b>{Post && Post.id}</b>
        </span>
        <span>&nbsp;|&nbsp;</span>
        <span>
          Created At:{' '}
          <b>{moment(Post && Post.createdAt).format('DD.MM.YYYY kk:mm')}</b>
        </span>
      </div>
      <p>
        <A
          target="_blank"
          href={Post && Post.url}
          rel="noopener noreferrer nofollow"
        >
          {Post && Post.url}
        </A>
      </p>
    </Section>
  );
};

PostInfo.propTypes = {
  loading: PropTypes.bool.isRequired,
  Post: PropTypes.object,
  error: PropTypes.object,
  postId: PropTypes.string.isRequired,
  postTitle: PropTypes.string.isRequired
};

PostInfo.defaultProps = {
  Post: null,
  error: null
};

export default connect(PostInfo);
