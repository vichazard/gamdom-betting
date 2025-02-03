import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

export const Title = styled.h1`
  font-size: 36px;
  font-weight: 600;
  color: red;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
`;

export const BackButton = styled(Link)`
  background-color: #75197c;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;

  &:hover {
    background-color: #55135c;
  }
`;
