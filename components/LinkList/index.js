import PropTypes from 'prop-types';
import { Link } from '../../routes';
import { StyledA, LogOutButton } from './styles';

const LinkList = ({ pathname, authenticated, logout }) =>
  <nav>
    <Link prefetch href="/" passHref>
      <StyledA active={pathname === '/'}>Main Page</StyledA>
    </Link>
    <Link prefetch route="create" passHref>
      <StyledA active={pathname === '/create_post'}>Create</StyledA>
    </Link>
    {!authenticated &&
      <Link prefetch route="signin" passHref>
        <StyledA active={pathname === '/sign_in'}>SignIn</StyledA>
      </Link>}
    {!authenticated &&
      <Link prefetch route="signup" passHref>
        <StyledA active={pathname === '/sign_up'}>SignUp</StyledA>
      </Link>}
    {authenticated &&
      <LogOutButton
        role="link"
        href="#"
        onClick={() => logout()}
        active={pathname === '/sign_up'}
      >
        LogOut
      </LogOutButton>}
    <StyledA
      href="https://github.com/Sly777/ran"
      rel="noopener noreferrer"
      target="_blank"
    >
      RAN! @ Github
    </StyledA>
  </nav>;

LinkList.propTypes = {
  pathname: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

export default LinkList;
