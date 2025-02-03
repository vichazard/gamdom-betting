import { mount } from 'cypress/react';
import BetModal from './index';

describe('BetModal Component', () => {
  const eventId = 1;
  const odd = 2.5;
  const oddId = 1;

  it('should render the modal when isOpen is true', () => {
    const onClose = cy.stub();
    mount(
      <BetModal
        isOpen={true}
        onClose={onClose}
        eventId={eventId}
        odd={odd}
        oddId={oddId}
      />
    );
    cy.get('[data-testid="modal-overlay"]').should('exist');
    cy.get('[data-testid="modal-content"]').should('exist');
  });

  it('should not render the modal when isOpen is false', () => {
    const onClose = cy.stub();
    mount(
      <BetModal
        isOpen={false}
        onClose={onClose}
        eventId={eventId}
        odd={odd}
        oddId={oddId}
      />
    );
    cy.get('[data-testid="modal-overlay"]').should('not.exist');
  });

  it('should not call onClose when the modal content is clicked', () => {
    const onClose = cy.stub();
    mount(
      <BetModal
        isOpen={true}
        onClose={onClose}
        eventId={eventId}
        odd={odd}
        oddId={oddId}
      />
    );
    cy.get('[data-testid="modal-content"]').click();
    cy.wrap(onClose).should('not.have.been.called');
  });

  it('should display a success toast when the bet is successful', () => {
    const onClose = cy.stub();
    cy.intercept('POST', '/api/v1/bets', {
      statusCode: 200,
      body: { message: 'Bet successful' },
    }).as('postBet');

    mount(
      <BetModal
        isOpen={true}
        onClose={onClose}
        eventId={eventId}
        odd={odd}
        oddId={oddId}
      />
    );
    cy.get('[data-testid="bet-input"]').type('10');
    cy.get('[data-testid="bet-button"]').click();
    cy.wait('@postBet');
  });
});
