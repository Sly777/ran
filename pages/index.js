import PostList from '../components/PostList';
import withData from '../libraries/withData';
import DefaultCon from '../containers/Default';
import GaWrapper from '../libraries/googleAnalytics';

export default GaWrapper(
  withData(props =>
    <DefaultCon {...props}>
      <PostList />
    </DefaultCon>
  )
);
