require('dotenv').config();
const http = require('http');
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const mongoose = require('mongoose');
const ticketRoutes = require('./routes/ticketRoutes');
const Resident = require('./models/Resident');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aptmaintain';

// Allowed client origins for CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_ORIGIN,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use('/api/tickets', ticketRoutes);

// In-Memory store fallback if MongoDB is not running locally (0 MB storage required)
const inMemoryResidents = [];

// Resident registration endpoint
app.post('/api/residents', async (req, res) => {
  try {
    const { name, email, flatNo, wing, mobile, password } = req.body;

    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !EMAIL_REGEX.test(email)) {
      return res.status(400).json({ message: 'A valid email address is required.' });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const passwordHash = crypto.scryptSync(password, salt, 64).toString('hex');

    // If MongoDB/Mongoose is connected, store in MongoDB database
    if (mongoose.connection.readyState === 1) {
      await Resident.create({
        name,
        email: email.trim().toLowerCase(),
        flatNo,
        wing: wing.toUpperCase(),
        mobile,
        passwordHash,
        salt,
      });
    } else {
      // In-Memory fallback store
      const exists = inMemoryResidents.some((r) => r.mobile === mobile);
      if (exists) {
        return res.status(409).json({ message: 'This mobile number is already registered.' });
      }
      inMemoryResidents.push({
        _id: 'r_' + Date.now(),
        name,
        email: email.trim().toLowerCase(),
        flatNo,
        wing: wing.toUpperCase(),
        mobile,
        passwordHash,
        salt,
        createdAt: new Date().toISOString(),
      });
    }

    res.status(201).json({ message: 'Registration successful. Welcome to AptMaintain!' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'This mobile number is already registered.' });
    }
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/health', (req, res) =>
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'MongoDB Connected' : 'Zero-Storage In-Memory Mode',
    time: new Date().toISOString(),
  })
);

// Exp 7: Node.js Core HTTP server creation
const server = http.createServer(app);

// Exp 5 & 6: MongoDB connection logic with Zero-Storage Fallback
mongoose
  .connect(MONGO_URI, { serverSelectionTimeoutMS: 2000 })
  .then(() => {
    console.log(`\x1b[32m[Database] MongoDB connected successfully to ${MONGO_URI}\x1b[0m`);
  })
  .catch(() => {
    console.log('\x1b[33m%s\x1b[0m', '-------------------------------------------------------------');
    console.log('\x1b[36m%s\x1b[0m', '⚡ [Notice] Local MongoDB is not running (No disk storage needed!)');
    console.log('\x1b[32m%s\x1b[0m', '✔  [Zero-Storage Mode] Activated In-Memory store for tickets & residents.');
    console.log('\x1b[37m%s\x1b[0m', '🌐 Free Cloud DB option: Set MONGO_URI in .env using free MongoDB Atlas.');
    console.log('\x1b[33m%s\x1b[0m', '-------------------------------------------------------------');
  })
  .finally(() => {
    server.listen(PORT, () => {
      console.log(`\x1b[35m🚀 AptMaintain Server running on http://localhost:${PORT}\x1b[0m`);
    });
  });