// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import connect from './store';
import { UpvoteButton } from './styles';

type Props = {
  upvote: (string | number, number) => void,
  id: string,
  votes?: number
};

const PostUpvoter = ({ upvote, votes, id }: Props) => (
  <UpvoteButton onClick={() => upvote(id, votes + 1)}>{votes}</UpvoteButton>
);

PostUpvoter.propTypes = {
  upvote: PropTypes.func.isRequired,
  votes: PropTypes.number,
  id: PropTypes.string.isRequired
};

PostUpvoter.defaultProps = {
  votes: 0
};

export default connect(PostUpvoter);
