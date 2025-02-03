import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { DashboardPage, NotFound } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<DashboardPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
