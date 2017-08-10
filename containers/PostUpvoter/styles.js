import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const UpvoteButton = styled.button`
  background-color: transparent;
  border: 1px solid #e4e4e4;
  color: #000;

  &:active {
    background-color: transparent;
  }

  &:before {
    align-self: center;
    border-color: transparent transparent #000000 transparent;
    border-style: solid;
    border-width: 0 4px 6px 4px;
    content: "";
    height: 0;
    margin-right: 5px;
    width: 0;
  }
`;
