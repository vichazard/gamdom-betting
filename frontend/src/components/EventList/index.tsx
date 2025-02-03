import { EventsItem } from '@/interfaces';
import { EventItem } from '../EventItem';
import { EventListContent } from './styled';

interface Props {
  list: EventsItem[];
}

export const EventList: React.FC<Props> = ({ list }) => {
  return (
    <EventListContent>
      {list.map((item) => (
        <EventItem key={item.event_id} item={item} />
      ))}
    </EventListContent>
  );
};
