import PostList from '~/containers/PostList'
import withData from '~/lib/withData'
import Layout from '~/containers/Layout'

export default withData(props =>
  <Layout {...props}>
    <PostList />
  </Layout>
)
