const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const Ticket = require('../models/Ticket');
const { ticketEvents, logFilePath } = require('../utils/logger');

const router = express.Router();

// Fallback in-memory store if MongoDB is not installed locally
let inMemoryTickets = [
  {
    _id: 'mem_t1',
    category: 'Plumbing',
    title: 'Main pipeline leakage near Block B pump',
    description: 'Water pressure is dropping in flats B-201 to B-204. Immediate inspection required.',
    flatNo: '201',
    wing: 'B',
    status: 'In Progress',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    _id: 'mem_t2',
    category: 'Elevator',
    title: 'Elevator #2 erratic floor leveling',
    description: 'Elevator stops 2 inches above floor level on 4th floor. Sensor recalibration needed.',
    flatNo: '402',
    wing: 'A',
    status: 'Open',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    _id: 'mem_t3',
    category: 'Electrical',
    title: 'Staircase lighting fixture replacement',
    description: 'Emergency LED fixture flickering between 2nd and 3rd floor staircase.',
    flatNo: '301',
    wing: 'C',
    status: 'Resolved',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

const isDbConnected = () => mongoose.connection.readyState === 1;

const validId = (req, res, next) => {
  if (isDbConnected()) {
    return mongoose.isValidObjectId(req.params.id) ? next() : res.status(400).json({ message: 'Invalid ticket id' });
  }
  // In-memory mode allows string IDs
  if (!req.params.id) return res.status(400).json({ message: 'Ticket ID required' });
  next();
};

// Exp 8: GET /api/tickets - fetch tickets with optional status filtering
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    if (isDbConnected()) {
      const filter = status ? { status } : {};
      const tickets = await Ticket.find(filter).sort({ createdAt: -1 });
      return res.json(tickets);
    }
    // Zero-Storage In-Memory Fallback
    let result = inMemoryTickets;
    if (status && status !== 'All') {
      result = result.filter((t) => t.status.toLowerCase() === status.toLowerCase());
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Exp 7: Node.js Streams - stream ticket activity log file
router.get('/logs/stream', (req, res) => {
  if (!fs.existsSync(logFilePath)) {
    return res.status(404).send('No logs recorded yet.');
  }
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  const readStream = fs.createReadStream(logFilePath);
  readStream.pipe(res);
});

// Exp 8: POST /api/tickets - create a new service ticket
router.post('/', async (req, res) => {
  try {
    const { category, title, description, flatNo, wing } = req.body;
    if (!category || !title || !description || !flatNo || !wing) {
      return res.status(400).json({ message: 'All ticket fields are required.' });
    }

    let ticket;
    if (isDbConnected()) {
      ticket = await Ticket.create({ category, title, description, flatNo, wing });
    } else {
      ticket = {
        _id: 't_' + Date.now(),
        category,
        title,
        description,
        flatNo,
        wing: wing.toUpperCase(),
        status: 'Open',
        createdAt: new Date().toISOString(),
      };
      inMemoryTickets.unshift(ticket);
    }

    // Exp 7: Emit event for file logging
    ticketEvents.emit('ticketAction', {
      action: 'CREATE',
      ticketId: ticket._id,
      details: { category, title, flat: `${wing}-${flatNo}`, status: ticket.status },
    });

    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Exp 8: PUT /api/tickets/:id - update ticket details / status
router.put('/:id', validId, async (req, res) => {
  try {
    const allowed = ['category', 'title', 'description', 'flatNo', 'wing', 'status'];
    const update = Object.fromEntries(Object.entries(req.body).filter(([k]) => allowed.includes(k)));

    let updatedTicket;
    if (isDbConnected()) {
      updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
      if (!updatedTicket) return res.status(404).json({ message: 'Ticket not found' });
    } else {
      const idx = inMemoryTickets.findIndex((t) => String(t._id) === String(req.params.id));
      if (idx === -1) return res.status(404).json({ message: 'Ticket not found' });
      inMemoryTickets[idx] = { ...inMemoryTickets[idx], ...update };
      updatedTicket = inMemoryTickets[idx];
    }

    // Exp 7: Emit event for file logging
    ticketEvents.emit('ticketAction', {
      action: 'UPDATE',
      ticketId: req.params.id,
      details: update,
    });

    res.json(updatedTicket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Exp 8: DELETE /api/tickets/:id - delete a ticket
router.delete('/:id', validId, async (req, res) => {
  try {
    let deletedTitle = 'Ticket';
    let deletedFlat = 'N/A';

    if (isDbConnected()) {
      const ticket = await Ticket.findByIdAndDelete(req.params.id);
      if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
      deletedTitle = ticket.title;
      deletedFlat = `${ticket.wing}-${ticket.flatNo}`;
    } else {
      const idx = inMemoryTickets.findIndex((t) => String(t._id) === String(req.params.id));
      if (idx === -1) return res.status(404).json({ message: 'Ticket not found' });
      deletedTitle = inMemoryTickets[idx].title;
      deletedFlat = `${inMemoryTickets[idx].wing}-${inMemoryTickets[idx].flatNo}`;
      inMemoryTickets.splice(idx, 1);
    }

    // Exp 7: Emit event for file logging
    ticketEvents.emit('ticketAction', {
      action: 'DELETE',
      ticketId: req.params.id,
      details: { title: deletedTitle, flat: deletedFlat },
    });

    res.json({ message: 'Ticket deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;