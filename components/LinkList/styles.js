import styled from 'styled-components';
import * as T from '../Theme';

export const A = styled(T.A)`
  font-size: 14px;
  margin-right: 15px;
  cursor: pointer;
  text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
`;

export const LogOutButton = styled(T.Button)`
  display: inline-block;
  margin-right: 15px;
  cursor: pointer;
  text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
`;

export const Nav = styled.nav`
  display: inline-block;
`;

export const Externals = styled.div`
  display: inline-block;
  border-left: 2px solid lightgray;
  padding-left: 15px;
`;
