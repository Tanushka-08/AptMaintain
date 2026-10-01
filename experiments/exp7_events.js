// experiments/exp7_events.js
const EventEmitter = require('events');
const hub = new EventEmitter();

hub.on('ticketRaised', (t) => {
    console.log(`[SMS Gateway]: SMS sent to ${t.resident} (${t.phone}) -> "Ticket #${t.id} registered."`);
});

hub.on('ticketRaised', (t) => {
    console.log(`[Push Notification]: Alert dispatched to Facility Manager -> "New [${t.priority}] ticket by Flat ${t.flat}."`);
});

hub.on('ticketRaised', (t) => {
    if (t.priority === 'High') {
        console.log(`[Automated Dispatch]: Alert sent to on-call duty technician for category: ${t.category} (SLA: 2 Hours).`);
    }
});

console.log('--- Triggering Event: ticketRaised ---');
hub.emit('ticketRaised', { id: 'TCK-9902', resident: 'Rajesh Sharma', phone: '+91 9820112345', flat: 'B-402', category: 'Plumbing', priority: 'High' });
