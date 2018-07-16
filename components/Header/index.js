// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import LinkList from '../LinkList';
import { Header as StyledHeader, Img } from './styles';
import connect from './store';

type Props = {
  pathname: string,
  authenticated?: boolean,
  actions: {
    logout: Function
  }
};

const Header = ({ pathname, authenticated, actions: { logout } }: Props) => (
  <StyledHeader>
    <Img
      alt="RAN!"
      src="https://user-images.githubusercontent.com/694940/29736531-6ab509e8-8a02-11e7-8e61-66e5ea4e29b8.png"
    />
    <LinkList
      pathname={pathname}
      authenticated={authenticated}
      logout={logout}
    />
  </StyledHeader>
);

Header.defaultProps = {
  authenticated: false
};

Header.propTypes = {
  pathname: PropTypes.string.isRequired,
  authenticated: PropTypes.bool,
  actions: PropTypes.shape({
    logout: PropTypes.func.isRequired
  }).isRequired
};

export default connect(Header);
