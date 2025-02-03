import { mount } from 'cypress/react';
import LoginModal from './index';
import { BrowserRouter as Router } from 'react-router-dom';

describe('LoginModal Component', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/v1/auth/login', {
      statusCode: 200,
      body: { message: 'Login successfully', token: 'fake-token' },
    }).as('loginRequest');
  });

  it('renders correctly when open', () => {
    const onClose = cy.stub();
    const setIsLogin = cy.stub();
    mount(
      <Router>
        <LoginModal isOpen={true} onClose={onClose} setIsLogin={setIsLogin} />
      </Router>
    );
    cy.get('input#email').should('exist');
    cy.get('input#password').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('does not render when closed', () => {
    const onClose = cy.stub();
    const setIsLogin = cy.stub();
    mount(
      <Router>
        <LoginModal isOpen={false} onClose={onClose} setIsLogin={setIsLogin} />
      </Router>
    );
    cy.get('input#email').should('not.exist');
    cy.get('input#password').should('not.exist');
  });

  it('submits the form and logs in successfully', () => {
    const onClose = cy.stub();
    const setIsLogin = cy.stub();
    mount(
      <Router>
        <LoginModal isOpen={true} onClose={onClose} setIsLogin={setIsLogin} />
      </Router>
    );

    cy.get('input#email').type('test@gmail.com');
    cy.get('input#password').type('password123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response?.statusCode).to.equal(200);
      expect(interception.response?.body.message).to.equal(
        'Login successfully'
      );
    });

    cy.wrap(onClose).should('have.been.calledOnce');
    cy.wrap(setIsLogin).should('have.been.calledWith', true);
    cy.window().then((win) => {
      expect(win.localStorage.getItem('token')).to.equal('fake-token');
    });
  });

  it('shows an error message on login failure', () => {
    const onClose = cy.stub();
    const setIsLogin = cy.stub();
    cy.intercept('POST', '/api/v1/auth/login', {
      statusCode: 401,
      body: { message: 'Failed to login' },
    }).as('loginRequestFail');

    mount(
      <Router>
        <LoginModal isOpen={true} onClose={onClose} setIsLogin={setIsLogin} />
      </Router>
    );

    cy.get('input#email').type('test@gmail.com');
    cy.get('input#password').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequestFail').then((interception) => {
      expect(interception.response?.statusCode).to.equal(401);
      expect(interception.response?.body.message).to.equal('Failed to login');
    });

    cy.wrap(onClose).should('have.been.calledOnce');
    cy.wrap(setIsLogin).should('not.have.been.called');
  });
});
