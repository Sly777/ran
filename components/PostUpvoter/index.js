import React from 'react';
import PropTypes from 'prop-types';
import connect from './store';
import { UpvoteButton } from './styles';

const PostUpvoter = ({ upvote, votes, id }) => (
  <UpvoteButton onClick={() => upvote(id, votes + 1)}>{votes}</UpvoteButton>
);

PostUpvoter.propTypes = {
  upvote: PropTypes.func.isRequired,
  votes: PropTypes.number,
  id: PropTypes.string.isRequired
};

PostUpvoter.defaultProps = {
  votes: []
};

export default connect(PostUpvoter);
