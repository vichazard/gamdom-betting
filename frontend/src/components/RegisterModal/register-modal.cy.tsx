import { mount } from 'cypress/react';
import RegisterModal from './index';
import { BrowserRouter as Router } from 'react-router-dom';

describe('RegisterModal Component', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/v1/auth/register', {
      statusCode: 200,
      body: { message: 'User created successfully' },
    }).as('registerRequest');
  });

  it('renders correctly when open', () => {
    const onClose = cy.stub();
    mount(
      <Router>
        <RegisterModal isOpen={true} onClose={onClose} />
      </Router>
    );
    cy.get('input#email').should('exist');
    cy.get('input#password').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('does not render when closed', () => {
    const onClose = cy.stub();
    mount(
      <Router>
        <RegisterModal isOpen={false} onClose={onClose} />
      </Router>
    );
    cy.get('input#email').should('not.exist');
    cy.get('input#password').should('not.exist');
  });

  it('should show error toast on registration failure', () => {
    const onClose = cy.stub();
    cy.intercept('POST', '/api/v1/auth/register', {
      statusCode: 401,
      body: { message: 'Failed to register' },
    }).as('registerRequestFail');

    mount(
      <Router>
        <RegisterModal isOpen={true} onClose={onClose} />
      </Router>
    );

    cy.get('input#email').type('test@gmail.com');
    cy.get('input#password').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.wait('@registerRequestFail').then((interception) => {
      expect(interception.response?.statusCode).to.equal(401);
      expect(interception.response?.body.message).to.equal(
        'Failed to register'
      );
    });

    cy.wrap(onClose).should('have.been.calledOnce');
  });

  it('should show success toast on registration success', () => {
    const onClose = cy.stub();
    mount(
      <Router>
        <RegisterModal isOpen={true} onClose={onClose} />
      </Router>
    );

    cy.get('input#email').type('test@gmail.com');
    cy.get('input#password').type('password123');
    cy.get('button[type="submit"]').click();

    cy.wait('@registerRequest').then((interception) => {
      expect(interception.response?.statusCode).to.equal(200);
      expect(interception.response?.body.message).to.equal(
        'User created successfully'
      );
    });

    cy.wrap(onClose).should('have.been.calledOnce');
  });
});
