import { EventList } from '@/components';
import { WithLayout } from '@/layouts';
import { PageContainer } from './styled';
import { basicService } from '@/services';
import { useBaseQuery } from '@/hooks';
import { EventsItem } from '@/interfaces';

const Events = () => {
  const { data: eventResponse } = useBaseQuery<EventsItem[]>(
    basicService,
    '/api/v1/events'
  );

  return (
    <PageContainer>
      {eventResponse && <EventList list={eventResponse} />}
    </PageContainer>
  );
};

export const EventsPage = WithLayout(Events);
