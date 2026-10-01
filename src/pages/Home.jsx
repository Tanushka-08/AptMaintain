import { Link } from 'react-router-dom';

const cards = [
  {
    no: '01',
    icon: '📊',
    title: 'Maintenance Bills',
    badge: 'Exp 2 Math Engine',
    text: 'Compute monthly flat maintenance, overdue penalty fees, and waiver discounts with ES6 calculations.',
    to: '/bills',
  },
  {
    no: '02',
    icon: '✍️',
    title: 'Raise a Service Ticket',
    badge: 'Exp 3 & 8 CRUD',
    text: 'Submit housing complaints for plumbing, electrical, elevator, or security issues with instant logging.',
    to: '/raise-ticket',
  },
  {
    no: '03',
    icon: '🔍',
    title: 'Track All Tickets',
    badge: 'Exp 4 & 9 Axios SPA',
    text: 'Filter and manage service tickets in real-time as they transition from Open to In Progress to Resolved.',
    to: '/tickets',
  },
];

export default function Home() {
  return (
    <div className="row g-4 my-2">
      {cards.map((c, i) => (
        <div className="col-md-4 fade-up" style={{ '--d': `${i * 0.12}s` }} key={c.to}>
          <div className="card h-100 shadow-sm p-4 hover-lift">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="step-no">{c.no}</span>
              <span className="badge category-badge">{c.badge}</span>
            </div>
            <div className="fs-1 mb-2">{c.icon}</div>
            <h4 className="fw-bold mb-2">{c.title}</h4>
            <p className="text-body-secondary small mb-4">{c.text}</p>
            <Link to={c.to} className="btn btn-outline-primary mt-auto align-self-start">
              Open Module &rarr;
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
