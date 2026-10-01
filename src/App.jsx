import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Bills from './pages/Bills.jsx';
import RaiseTicketPage from './pages/RaiseTicketPage.jsx';
import Tickets from './pages/Tickets.jsx';

export default function App() {
  const location = useLocation();

  // The hero and registration form live in index.html, so show them only on "/"
  // and keep the active navbar link in sync when the route changes without a reload.
  useEffect(() => {
    const home = document.getElementById('home-only');
    if (home) home.style.display = location.pathname === '/' ? '' : 'none';
    document.querySelectorAll('#nav .nav-link').forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === location.pathname);
    });
  }, [location.pathname]);

  return (
    <div key={location.pathname} className="page-enter">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/bills" element={<Bills />} />
        <Route path="/raise-ticket" element={<RaiseTicketPage />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
