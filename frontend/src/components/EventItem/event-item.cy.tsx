import { mount } from 'cypress/react';
import { EventItem } from './index';
import { EventsItem } from '@/interfaces';
import { toast } from 'react-toastify';

describe('EventItem Component', () => {
  const item: EventsItem = {
    event_id: 1,
    event_name: 'Test Event',
    odds: [1.5, 2.0, 2.5],
  };

  beforeEach(() => {
    cy.stub(toast, 'warn');
  });

  it('should render event name and odds', () => {
    mount(<EventItem item={item} />);
    cy.contains(item.event_name).should('exist');
    item.odds.forEach((odd) => {
      cy.contains(odd).should('exist');
    });
  });

  it('should select and deselect an odd', () => {
    mount(<EventItem item={item} />);
    cy.contains('1.5').click();
    cy.contains('1.5').should(
      'have.css',
      'background-color',
      'rgba(6, 6, 6, 0.27)'
    );
    cy.contains('1.5').click();
    cy.contains('1.5').should(
      'have.css',
      'background-color',
      'rgb(48, 54, 61)'
    );
  });

  it('should open and close BetModal', () => {
    mount(<EventItem item={item} />);
    cy.contains('2').click();
    cy.contains('Bet').click();
    cy.get('[data-testid="modal-content"]').should('exist');
    cy.get('[data-testid="bet-button"]').click();
    cy.get('[data-testid="modal-content"]').should('not.exist');
  });
});
