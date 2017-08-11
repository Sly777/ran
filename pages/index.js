import PostList from '../containers/PostList';
import withData from '../libraries/withData';
import DefaultCon from '../containers/Default';

export default withData(props =>
  <DefaultCon {...props}>
    <PostList />
  </DefaultCon>
);
