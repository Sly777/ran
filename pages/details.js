import PostInfo from '../containers/PostInfo';
import withData from '../libraries/withData';
import DefaultCon from '../layouts/Default';

export default withData(props =>
  <DefaultCon title={decodeURIComponent(props.url.query.postTitle)} {...props}>
    <PostInfo
      postId={props.url.query.postId}
      postTitle={props.url.query.postTitle}
    />
  </DefaultCon>
);
