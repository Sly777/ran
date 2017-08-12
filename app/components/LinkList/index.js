import PropTypes from 'prop-types'
import { Link } from '../../routes'
import * as S from './styles'

const LinkList = ({ pathname, authenticated, logout }) =>
  <nav>
    <Link prefetch href="/" passHref>
      <S.A active={pathname === '/'}>Main Page</S.A>
    </Link>
    <Link prefetch route="create" passHref>
      <S.A active={pathname === '/create_post'}>Create</S.A>
    </Link>
    {!authenticated &&
      <Link prefetch route="signin" passHref>
        <S.A active={pathname === '/sign_in'}>SignIn</S.A>
      </Link>}
    {!authenticated &&
      <Link prefetch route="signup" passHref>
        <S.A active={pathname === '/sign_up'}>SignUp</S.A>
      </Link>}
    {authenticated &&
      <S.LogOutButton
        role="link"
        href="#"
        onClick={() => logout()}
        active={pathname === '/sign_up'}
      >
        LogOut
      </S.LogOutButton>}
    <S.A
      href="https://github.com/Sly777/ran"
      rel="noopener noreferrer"
      target="_blank"
    >
      RAN! @ Github
    </S.A>
  </nav>

LinkList.propTypes = {
  pathname: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
}

export default LinkList
