import CreatePost from '~/containers/CreatePost'
import withData from '~/lib/withData'
import Layout from '~/containers/Layout'

export default withData(props =>
  <Layout title="Create Post" {...props}>
    <CreatePost />
  </Layout>
)
