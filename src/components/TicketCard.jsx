const STATUS_STYLE = { Open: 'danger', 'In Progress': 'warning', Resolved: 'success' };

const CATEGORY_ICONS = {
  Plumbing: '🚰',
  Electrical: '⚡',
  Elevator: '🛗',
  Security: '🛡️',
};

export default function TicketCard({ ticket, onStatusChange, onDelete }) {
  const { _id, category, title, description, flatNo, wing, status, createdAt } = ticket;
  const statusClass = (status || 'Open').toLowerCase().replace(' ', '-');

  return (
    <div className={`card shadow-sm h-100 hover-lift border-status-${statusClass}`}>
      <div className="card-body p-3 p-md-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="category-badge">
            <span className="me-1">{CATEGORY_ICONS[category] || '📋'}</span>
            {category}
          </span>
          <span className={`badge badge-status badge-${statusClass}`}>
            <span className="status-dot"></span>
            {status}
          </span>
        </div>

        <h5 className="card-title fw-bold mb-2">{title}</h5>
        <p className="card-text text-body-secondary small mb-3">{description}</p>

        <div className="d-flex align-items-center justify-content-between pt-2 border-top border-light-subtle">
          <span className="badge bg-body-secondary text-body fw-semibold">Wing {wing}-{flatNo}</span>
          <small className="text-body-tertiary">
            📅 {new Date(createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
          </small>
        </div>
      </div>

      <div className="card-footer d-flex gap-2 bg-transparent border-0 pt-0 pb-3 px-3 px-md-4">
        <select
          className="form-select form-select-sm"
          value={status}
          onChange={(e) => onStatusChange(_id, e.target.value)}
          aria-label="Update ticket status"
        >
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => onDelete(_id)}
          title="Delete this ticket"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
