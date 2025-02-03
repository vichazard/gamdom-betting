import { WithLayout } from '@/layouts';
import { DashboardContainer } from './styled';

const Dashboard = () => {
  return (
    <DashboardContainer>
      <h1>Dashboard</h1>
    </DashboardContainer>
  );
};

export const DashboardPage = WithLayout(Dashboard);
