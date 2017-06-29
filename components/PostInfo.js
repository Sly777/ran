import { gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

const postInfoQuery = gql`
  query getPost($postId: ID!) {
    Post(id: $postId) {
      title
      votes
      id
      url
      createdAt
    }
  }
`;

let PostInfo = ({ data: { Post }, className }) => {
  if (!Post) {
    return (
      <section className={className}>
        <h1>Loading...</h1>
      </section>
    );
  }

  return (
    <section className={className}>
      <h1>
        {Post.title}
      </h1>
      <div>
        <span>
          ID: <b>{Post.id}</b>
        </span>
        <span>&nbsp;|&nbsp;</span>
        <span>
          Created At: {' '}
          <b>{moment(Post.createdAt).format('DD.MM.YYYY kk:mm')}</b>
        </span>
      </div>
      <p>
        <a target="_blank" href={Post.url} rel="noopener noreferrer nofollow">
          {Post.url}
        </a>
      </p>
    </section>
  );
};

PostInfo.propTypes = {
  data: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
};

PostInfo = styled(PostInfo)`
  padding-bottom: 20px;

  > h1 {
    margin-top: 0;
  }

  > p {
    font-size: 17px;
  }
`;

export default graphql(postInfoQuery, {
  options: ({ postId }) => ({
    variables: {
      postId
    }
  }),
  props: ({ data }) => ({
    data
  })
})(PostInfo);
