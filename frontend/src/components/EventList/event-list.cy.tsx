import { mount } from 'cypress/react';
import { EventList } from './index';
import { EventsItem } from '@/interfaces';

describe('EventList Component', () => {
  const mockEvents: EventsItem[] = [
    { event_id: 1, event_name: 'Event 1', odds: [1, 2, 3] },
    { event_id: 2, event_name: 'Event 2', odds: [1.1, 2.2, 3.3] },
  ];

  it('renders without crashing', () => {
    mount(<EventList list={mockEvents} />);
  });

  it('renders the correct number of EventItem components', () => {
    mount(<EventList list={mockEvents} />);
    cy.get('[data-testid="event-item"]').should(
      'have.length',
      mockEvents.length
    );
  });

  it('renders the correct event details', () => {
    mount(<EventList list={mockEvents} />);
    mockEvents.forEach((event) => {
      cy.contains(event.event_name).should('exist');
      cy.contains('1').should('exist');
    });
  });
});
