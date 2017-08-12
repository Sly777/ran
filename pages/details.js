import PostInfo from '~/containers/PostInfo'
import withData from '~/lib/withData'
import Layout from '~/containers/Layout'

export default withData(props =>
  <Layout title={decodeURIComponent(props.url.query.postTitle)} {...props}>
    <PostInfo
      postId={props.url.query.postId}
      postTitle={props.url.query.postTitle}
    />
  </Layout>
)
