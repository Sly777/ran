import React from 'react';
import { gql, graphql } from 'react-apollo';
import styled from 'styled-components';
import PropTypes from 'prop-types';

let PostUpvoter = ({ upvote, votes, id }) =>
  <button onClick={() => upvote(id, votes + 1)}>
    {votes}
  </button>;

PostUpvoter.propTypes = {
  upvote: PropTypes.func.isRequired,
  votes: PropTypes.number,
  id: PropTypes.string.isRequired
};

PostUpvoter.defaultProps = {
  votes: []
};

PostUpvoter = styled(PostUpvoter)`
  background-color: transparent;
  border: 1px solid #e4e4e4;
  color: #000;

  &:active {
    background-color: transparent;
  }

  &:before {
    align-self: center;
    border-color: transparent transparent #000000 transparent;
    border-style: solid;
    border-width: 0 4px 6px 4px;
    content: "";
    height: 0;
    margin-right: 5px;
    width: 0;
  }
`;

const upvotePost = gql`
  mutation updatePost($id: ID!, $votes: Int) {
    updatePost(id: $id, votes: $votes) {
      id
      __typename
      votes
    }
  }
`;

export default graphql(upvotePost, {
  props: ({ ownProps, mutate }) => ({
    upvote: (id, votes) =>
      mutate({
        variables: { id, votes },
        optimisticResponse: {
          __typename: 'Mutation',
          updatePost: {
            __typename: 'Post',
            id: ownProps.id,
            votes: ownProps.votes + 1
          }
        }
      })
  })
})(PostUpvoter);
