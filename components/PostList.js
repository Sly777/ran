import { gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'next-url-prettifier';
import { Router } from '../routes';
import PostUpvoter from './PostUpvoter';

const POSTS_PER_PAGE = 10;

let PostList = ({
  data: { allPosts, loading, _allPostsMeta },
  loadMorePosts,
  className
}) => {
  if (allPosts && allPosts.length) {
    const areMorePosts = allPosts.length < _allPostsMeta.count;
    return (
      <section className={className}>
        <ul>
          {allPosts.map((post, index) =>
            <li key={post.id}>
              <div>
                <span>
                  {index + 1}.{' '}
                </span>
                <Link
                  route={Router.linkPage('details', {
                    postId: post.id,
                    postTitle: encodeURIComponent(post.title)
                  })}
                >
                  <a>
                    {post.title}
                  </a>
                </Link>
                <PostUpvoter id={post.id} votes={post.votes} />
              </div>
            </li>
          )}
        </ul>
        {areMorePosts
          ? <button onClick={() => loadMorePosts()}>
              {loading ? 'Loading...' : 'Show More'}
            </button>
          : ''}
      </section>
    );
  }
  return <div>Loading</div>;
};

PostList.propTypes = {
  data: PropTypes.object.isRequired,
  loadMorePosts: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired
};

PostList = styled(PostList)`
  padding-bottom: 20px;

  li {
    display: block;
    margin-bottom: 10px;
  }
  div {
    align-items: center;
    display: flex;
  }
  a {
    font-size: 14px;
    margin-right: 10px;
    text-decoration: none;
    padding-bottom: 0;
    border: 0;
  }
  span {
    font-size: 14px;
    margin-right: 5px;
  }
  ul {
    margin: 0;
    padding: 0;
  }
  button:before {
    align-self: center;
    border-style: solid;
    border-width: 6px 4px 0 4px;
    border-color: #ffffff transparent transparent transparent;
    content: "";
    height: 0;
    margin-right: 5px;
    width: 0;
  }
`;

const allPosts = gql`
  query allPosts($first: Int!, $skip: Int!) {
    allPosts(orderBy: createdAt_DESC, first: $first, skip: $skip) {
      id
      title
      votes
      createdAt
    }
    _allPostsMeta {
      count
    }
  }
`;

export default graphql(allPosts, {
  options: () => ({
    variables: {
      skip: 0,
      first: POSTS_PER_PAGE
    }
  }),
  props: ({ data }) => ({
    data,
    loadMorePosts: () =>
      data.fetchMore({
        variables: {
          skip: data.allPosts.length
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult;
          }
          return Object.assign({}, previousResult, {
            // Append the new posts results to the old one
            allPosts: [...previousResult.allPosts, ...fetchMoreResult.allPosts]
          });
        }
      })
  })
})(PostList);
