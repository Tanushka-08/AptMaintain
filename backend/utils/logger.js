const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

// Experiment 7: Node.js Core Events (EventEmitter)
class TicketEventEmitter extends EventEmitter {}
const ticketEvents = new TicketEventEmitter();

// Ensure logs directory exists
const logDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logFilePath = path.join(logDir, 'tickets.log');

// Experiment 7: Node.js Core fs and Streams (WriteStream for logging)
const logStream = fs.createWriteStream(logFilePath, { flags: 'a', encoding: 'utf-8' });

ticketEvents.on('ticketAction', ({ action, ticketId, details, timestamp }) => {
  const time = timestamp || new Date().toISOString();
  const logLine = `[${time}] ACTION: ${action} | TICKET_ID: ${ticketId || 'N/A'} | DETAILS: ${JSON.stringify(details || {})}\n`;
  logStream.write(logLine);
  console.log(`[TicketLog] ${logLine.trim()}`);
});

module.exports = {
  ticketEvents,
  logFilePath,
};