import PostList from '../containers/PostList';
import withData from '../libraries/withData';
import Layout from '../containers/Layout';

export default withData(props =>
  <Layout {...props}>
    <PostList />
  </Layout>
);
