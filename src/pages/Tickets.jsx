import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TicketCard from '../components/TicketCard.jsx';
import { getTickets, updateTicket, deleteTicket } from '../services/api.js';

const FILTERS = ['All', 'Open', 'In Progress', 'Resolved'];

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    getTickets(filter === 'All' ? '' : filter)
      .then((res) => { if (active) { setTickets(res.data); setError(''); } })
      .catch(() => active && setError('Could not load tickets. Is the server running?'))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [filter]);

  const changeStatus = async (id, status) => {
    try {
      const { data } = await updateTicket(id, { status });
      setTickets(tickets.map((t) => (t._id === id ? data : t)));
    } catch { setError('Failed to update status.'); }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this ticket?')) return;
    try {
      await deleteTicket(id);
      setTickets(tickets.filter((t) => t._id !== id));
    } catch { setError('Failed to delete ticket.'); }
  };

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
        <h2 className="mb-0">Service Tickets</h2>
        <div className="btn-group">
          {FILTERS.map((f) => (
            <button key={f} className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="text-center py-5"><div className="spinner-border text-primary" /></div>
      ) : tickets.length === 0 ? (
        <div className="alert alert-secondary">No tickets found. <Link to="/raise-ticket">Raise one</Link>.</div>
      ) : (
        <div className="row g-3">
          {tickets.map((t, i) => (
            <div className="col-md-6 col-lg-4 fade-up" style={{ '--d': `${Math.min(i, 8) * 0.07}s` }} key={t._id}>
              <TicketCard ticket={t} onStatusChange={changeStatus} onDelete={remove} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
