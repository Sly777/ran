// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from '../../routes';
import { A, LogOutButton, Nav, Externals } from './styles';

type Props = {
  pathname: string,
  authenticated: boolean,
  logout: Function
};

const LinkList = ({ pathname, authenticated, logout }: Props) => (
  <Nav>
    <Link prefetch href="/" passHref>
      <A active={pathname === '/'}>Main Page</A>
    </Link>
    <Link prefetch route="create" passHref>
      <A active={pathname === '/create_post'}>Create</A>
    </Link>
    {!authenticated && (
      <Link prefetch route="signin" passHref>
        <A active={pathname === '/sign_in'}>SignIn</A>
      </Link>
    )}
    {!authenticated && (
      <Link prefetch route="signup" passHref>
        <A active={pathname === '/sign_up'}>SignUp</A>
      </Link>
    )}
    {authenticated && (
      <LogOutButton
        role="link"
        href="#"
        onClick={() => logout()}
        active={pathname === '/sign_up'}
      >
        LogOut
      </LogOutButton>
    )}
    <Externals>
      <A href="https://www.rantoolkit.com" target="_blank">
        RAN! Documentation
      </A>
      <A href="https://github.com/Sly777/ran" target="_blank">
        RAN! @ Github
      </A>
    </Externals>
  </Nav>
);

LinkList.propTypes = {
  pathname: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

export default LinkList;
