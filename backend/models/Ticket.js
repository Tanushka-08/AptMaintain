const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    category: { type: String, enum: ['Plumbing', 'Electrical', 'Elevator', 'Security'], required: true },
    title: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, required: true, trim: true, maxlength: 500 },
    flatNo: { type: String, required: true, match: /^[A-Za-z0-9-]{1,6}$/ },
    wing: { type: String, required: true, uppercase: true, match: /^[A-Za-z]$/ },
    status: { type: String, enum: ['Open', 'In Progress', 'Resolved'], default: 'Open' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Ticket', ticketSchema);
