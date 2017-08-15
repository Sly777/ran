import styled from 'styled-components';
import { Button } from '../Theme';

// eslint-disable-next-line import/prefer-default-export
export const Form = styled.form`
  border-bottom: 1px solid #ececec;
  padding-bottom: 20px;
  margin-bottom: 20px;

  > h1 {
    font-size: 20px;
  }
  > input {
    display: block;
    margin-bottom: 10px;
  }
`;
export { Button as SubmitButton };
