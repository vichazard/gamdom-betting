import { QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PATH } from './constants';
import { queryClient } from './hooks';
import { ToastContainer } from 'react-toastify';

import { DashboardPage, EventsPage, NotFound } from './pages';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path={PATH.EVENTS} element={<PrivateRoute />}>
            <Route index element={<EventsPage />} />
          </Route>
          <Route index element={<DashboardPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
