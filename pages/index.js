import PostList from '../containers/PostList';
import withData from '../libraries/withData';
import DefaultCon from '../layouts/Default';

export default withData(props =>
  <DefaultCon {...props}>
    <PostList />
  </DefaultCon>
);
