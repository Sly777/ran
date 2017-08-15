import CreatePost from '../components/CreatePost';
import withData from '../libraries/withData';
import DefaultCon from '../containers/Default';
import GaWrapper from '../libraries/googleAnalytics';

export default GaWrapper(
  withData(props =>
    <DefaultCon title="Create Post" {...props}>
      <CreatePost />
    </DefaultCon>
  )
);
