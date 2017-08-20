import { connect } from 'react-redux'
import { dispatchers } from '~/stores/auth'
import Feature from './feature'

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
})

const mapDispatchToProps = dispatch => ({
  actions: {
    logout: () => dispatch(dispatchers.signOut())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Feature)
