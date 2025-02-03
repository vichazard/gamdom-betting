import { PATH } from '@/constants';
import { BackButton, Content, NotFoundContainer, Title } from './styled';

export const NotFound = () => {
  return (
    <NotFoundContainer>
      <Title>404 Page Not Found</Title>
      <Content>
        <BackButton to={PATH.DASHBOARD}>Dashboard</BackButton>
      </Content>
    </NotFoundContainer>
  );
};
