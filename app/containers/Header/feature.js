import PropTypes from 'prop-types'
import LinkList from '~/components/LinkList'
import Logo from '~/components/Logo'
import * as S from './styles'

const Header = ({ pathname, authenticated, actions: { logout } }) =>
  <S.Header>
    <LinkList
      pathname={pathname}
      authenticated={authenticated}
      logout={logout}
    />
    <Logo />
  </S.Header>

Header.defaultProps = {
  authenticated: false,
}

Header.propTypes = {
  pathname: PropTypes.string.isRequired,
  authenticated: PropTypes.bool,
  actions: PropTypes.shape({
    logout: PropTypes.func.isRequired,
  }).isRequired,
}

export default Header
