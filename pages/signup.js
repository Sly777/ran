import SignUpForm from '~/containers/SignUpForm'
import withData from '~/lib/withData'
import Layout from '~/containers/Layout'

export default withData(props =>
  <Layout title="Sign Up" {...props}>
    <SignUpForm />
  </Layout>
)
