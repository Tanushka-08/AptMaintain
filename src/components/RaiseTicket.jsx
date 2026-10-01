import { useState } from 'react';
import { createTicket } from '../services/api.js';

const CATEGORIES = ['Plumbing', 'Electrical', 'Elevator', 'Security'];
const EMPTY = { category: 'Plumbing', title: '', description: '', flatNo: '', wing: '' };

export default function RaiseTicket({ onCreated }) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim() || !/^[A-Za-z0-9-]{1,6}$/.test(form.flatNo) || !/^[A-Za-z]$/.test(form.wing)) {
      setError('Fill all fields. Wing must be one letter and flat number up to 6 characters (letters, digits or -).');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const { data } = await createTicket({ ...form, wing: form.wing.toUpperCase() });
      setForm(EMPTY);
      if (onCreated) onCreated(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not raise ticket. Is the server running?');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="card shadow-sm p-4 fade-up" onSubmit={submit}>
      <h3 className="mb-3">Raise a Service Ticket</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">Category</label>
          <select className="form-select" name="category" value={form.category} onChange={handle}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="col-6 col-md-4 mb-3">
          <label className="form-label">Wing</label>
          <input className="form-control text-uppercase" name="wing" maxLength="1" value={form.wing} onChange={handle} />
        </div>
        <div className="col-6 col-md-4 mb-3">
          <label className="form-label">Flat No</label>
          <input className="form-control" name="flatNo" value={form.flatNo} onChange={handle} />
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input className="form-control" name="title" value={form.title} onChange={handle} />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea className="form-control" rows="4" name="description" value={form.description} onChange={handle} />
      </div>
      <button className="btn btn-primary" disabled={busy}>{busy ? 'Submitting...' : 'Submit Ticket'}</button>
    </form>
  );
}
