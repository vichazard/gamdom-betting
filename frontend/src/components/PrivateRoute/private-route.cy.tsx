import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { mount } from 'cypress/react';
import PrivateRoute from './index';

describe('PrivateRoute Component', () => {
  it('should navigate to the home page if not authenticated', () => {
    localStorage.removeItem('token');
    mount(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/private" element={<PrivateRoute />} />
        </Routes>
      </MemoryRouter>
    );
    cy.contains('Home Page').should('exist');
  });

  it('should render the outlet if authenticated', () => {
    localStorage.setItem('token', 'test-token');
    mount(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/private" element={<PrivateRoute />}>
            <Route path="" element={<div>Private Page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    cy.contains('Private Page').should('exist');
  });
});
