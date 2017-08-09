import styled from 'styled-components';

export const A = styled.a`
  font-size: 14px;
  margin-right: 15px;
  text-decoration: none;
  cursor: pointer;
  text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
`;

export const LogOutButton = styled.button`
  display: inline-block;
  margin-right: 15px;
  cursor: pointer;
  text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
`;
