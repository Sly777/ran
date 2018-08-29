import styled from 'styled-components';
import * as T from '../Theme';

export const Main = styled.section`
  padding: 10px 15px;
  padding-bottom: 20px;
`;

export const Item = styled.li`
  display: block;
  margin-bottom: 10px;
`;

export const Loading = styled.div`
  align-items: center;
  display: flex;
`;

export const Title = styled(T.A)`
  font-size: 14px;
  margin-right: 10px;
  text-decoration: none;
  padding-bottom: 0;
  border: 0;
`;

export const Index = styled.span`
  font-size: 14px;
  margin-right: 5px;
`;

export const ItemList = styled.ul`
  margin: 0;
  padding: 0;
`;

export const ShowMore = styled(T.Button)`
  &:before {
    align-self: center;
    border-style: solid;
    border-width: 6px 4px 0 4px;
    border-color: #ffffff transparent transparent transparent;
    content: '';
    height: 0;
    margin-right: 5px;
    width: 0;
  }
`;
