import { useState } from 'react';
import { Bet, EventItemContent, Odd, Odds, Title } from './styled';
import BetModal from '../BetModal';
import { EventsItem } from '@/interfaces';
import { toast } from 'react-toastify';

interface Props {
  item: EventsItem;
}

export const EventItem: React.FC<Props> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOddId, setSelectedOddId] = useState<number | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const openModal = () => {
    if (selectedOddId === null) {
      toast.warn('Please select an odd to bet');
      return;
    }
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  const handleOddClick = (eventId: number, oddId: number) => {
    if (oddId == selectedOddId) {
      setSelectedEventId(null);
      setSelectedOddId(null);
    } else {
      setSelectedOddId(oddId);
      setSelectedEventId(eventId);
    }
  };

  return (
    <>
      <EventItemContent data-testid="event-item">
        <Title title={item.event_name}>{item.event_name}</Title>
        <Odds>
          {item.odds.map((odd, index) => (
            <Odd
              onClick={() => handleOddClick(item.event_id, index)}
              key={index}
              active={
                selectedEventId === item.event_id && selectedOddId === index
                  ? 'active'
                  : 'inactive'
              }
            >
              {odd}
            </Odd>
          ))}
        </Odds>
        <Bet onClick={openModal}>Bet</Bet>
      </EventItemContent>
      {selectedEventId && selectedOddId && (
        <BetModal
          isOpen={isOpen}
          onClose={closeModal}
          eventId={selectedEventId}
          oddId={selectedOddId}
          odd={item.odds[selectedOddId]}
        />
      )}
    </>
  );
};
