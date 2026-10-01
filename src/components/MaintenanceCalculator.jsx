import { useState } from 'react';

// Sample data for demonstration. Change the values in the page to test other cases.
const SAMPLE_FLATS = [
  { flat: 'A-101', area: 650, monthsLate: 0 },
  { flat: 'A-102', area: 800, monthsLate: 2 },
  { flat: 'B-201', area: 950, monthsLate: 1 },
  { flat: 'B-202', area: 700, monthsLate: 4 },
  { flat: 'C-301', area: 1100, monthsLate: 0 },
  { flat: 'C-302', area: 850, monthsLate: 3 },
];

const money = (n) => 'Rs. ' + n.toLocaleString('en-IN', { maximumFractionDigits: 2 });

export default function MaintenanceCalculator() {
  // Starting values are samples; every one of them can be edited on the page.
  const [rate, setRate] = useState(3);
  const [fixedCharges, setFixedCharges] = useState(500);
  const [penaltyPct, setPenaltyPct] = useState(2);
  const [discountPct, setDiscountPct] = useState(10);
  const [flats, setFlats] = useState(SAMPLE_FLATS);

  const changeMonthsLate = (flat, value) => {
    const months = Math.max(0, Number(value) || 0);
    setFlats(flats.map((f) => (f.flat === flat ? { ...f, monthsLate: months } : f)));
  };

  // map: build the bill of every flat
  const bills = flats.map((f) => {
    const monthly = f.area * rate + fixedCharges;
    const penalty = monthly * (penaltyPct / 100) * f.monthsLate;
    const discount = penalty * (discountPct / 100);
    const total = monthly * (f.monthsLate + 1) + penalty - discount;
    return { ...f, monthly, penalty, discount, total };
  });

  // filter: flats with unpaid earlier months
  const defaulters = bills.filter((b) => b.monthsLate > 0);

  // reduce: society totals
  const totals = bills.reduce(
    (sum, b) => ({
      monthly: sum.monthly + b.monthly,
      penalty: sum.penalty + b.penalty,
      discount: sum.discount + b.discount,
      total: sum.total + b.total,
    }),
    { monthly: 0, penalty: 0, discount: 0, total: 0 }
  );

  const numberField = (label, value, setter, step) => (
    <div className="col-6 col-md-3 mb-3">
      <label className="form-label">{label}</label>
      <input
        type="number"
        min="0"
        step={step}
        className="form-control"
        value={value}
        onChange={(e) => setter(Math.max(0, Number(e.target.value) || 0))}
      />
    </div>
  );

  return (
    <div>
      <h2 className="mb-3">Maintenance Bill Calculator</h2>

      <div className="card shadow-sm p-3 mb-4 fade-up">
        <div className="row">
          {numberField('Rate (Rs. per sq ft)', rate, setRate, 0.5)}
          {numberField('Fixed charges (Rs.)', fixedCharges, setFixedCharges, 50)}
          {numberField('Late fee (% per month)', penaltyPct, setPenaltyPct, 0.5)}
          {numberField('Penalty discount (%)', discountPct, setDiscountPct, 5)}
        </div>
        <small className="text-muted">
          Monthly = area x rate + fixed charges. Penalty = monthly x late fee % x overdue months.
          Discount = penalty x discount %. Total due = current month + overdue months + penalty - discount.
          The values above and the flat list are sample data.
        </small>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Flat</th><th>Area (sq ft)</th><th>Overdue months</th>
              <th>Monthly</th><th>Penalty</th><th>Discount</th><th>Total due</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((b, i) => (
              <tr key={b.flat} style={{ '--i': i }}>
                <td>{b.flat}</td>
                <td>{b.area}</td>
                <td style={{ maxWidth: 90 }}>
                  <input
                    type="number"
                    min="0"
                    className="form-control form-control-sm"
                    value={b.monthsLate}
                    onChange={(e) => changeMonthsLate(b.flat, e.target.value)}
                  />
                </td>
                <td>{money(b.monthly)}</td>
                <td>{money(b.penalty)}</td>
                <td>{money(b.discount)}</td>
                <td className="fw-bold">{money(b.total)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="table-light fw-bold">
            <tr>
              <td colSpan="3">Total</td>
              <td>{money(totals.monthly)}</td>
              <td>{money(totals.penalty)}</td>
              <td>{money(totals.discount)}</td>
              <td>{money(totals.total)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <p>
        Flats with overdue payments: <strong>{defaulters.length}</strong> of {bills.length}
        {defaulters.length > 0 && ' (' + defaulters.map((d) => d.flat).join(', ') + ')'}
      </p>
    </div>
  );
}
