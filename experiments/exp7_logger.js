// experiments/exp7_logger.js
const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'society_activity.log');

const logActivity = (action, resident, flat, details) => {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] | ACTION: ${action.padEnd(15)} | RESIDENT: ${resident.padEnd(16)} | FLAT: ${flat} | DETAILS: ${details}\n`;
    fs.appendFile(logFilePath, entry, 'utf8', (err) => {
        if (!err) console.log(`[Logger Success]: Activity logged -> ${action} for Flat ${flat}`);
    });
};

console.log('--- Commencing Society Log Dispatch ---');
logActivity('TICKET_RAISED', 'Rajesh Sharma', 'B-402', 'Plumbing issue: Main sink leak');
logActivity('BILL_PAID', 'Priya Menon', 'A-105', 'Paid ₹4,500 via UPI');
logActivity('VISITOR_ENTRY', 'Security Gate 1', 'C-404', 'Delivery agent approved');
logActivity('STATUS_UPDATE', 'Technician Ramesh', 'B-402', 'Plumbing ticket resolved');
console.log('--- Asynchronous Log Calls Dispatched to libuv ---');
