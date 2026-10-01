const mongoose = require('mongoose');

const residentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address.'],
    },
    flatNo: { type: String, required: true, match: /^[A-Za-z0-9-]{1,6}$/ },
    wing: { type: String, required: true, uppercase: true, match: /^[A-Za-z]$/ },
    mobile: { type: String, required: true, unique: true, match: /^[6-9]\d{9}$/ },
    passwordHash: { type: String, required: true },
    salt: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Resident', residentSchema);