import PostInfo from '../components/PostInfo';
import withData from '../libraries/withData';
import DefaultCon from '../containers/Default';
import GaWrapper from '../libraries/googleAnalytics';

export default withData(props =>
  GaWrapper(
    <DefaultCon
      title={decodeURIComponent(props.url.query.postTitle)}
      {...props}
    >
      <PostInfo
        postId={props.url.query.postId}
        postTitle={props.url.query.postTitle}
      />
    </DefaultCon>
  )
);
