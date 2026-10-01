// experiments/exp5_crud.js (Run inside mongosh or node with mongoose)
// Save to copy-paste into mongosh
use AptMaintainDB;

db.residents.drop();
db.tickets.drop();

// 1. insertOne & insertMany
db.residents.insertOne({
    residentId: "RES-1001",
    fullName: "Rajesh Sharma",
    wing: "B",
    flatNo: "402",
    contact: { phone: "9820112345", email: "rajesh.sharma@example.com" },
    role: "Owner",
    isActive: true
});

db.residents.insertMany([
    { residentId: "RES-1002", fullName: "Priya Menon", wing: "A", flatNo: "105", contact: { phone: "9876543210" }, role: "Tenant", isActive: true },
    { residentId: "RES-1003", fullName: "Vikram Singhania", wing: "C", flatNo: "404", contact: { phone: "9123456780" }, role: "Owner", isActive: true },
    { residentId: "RES-1004", fullName: "Karan Mehra", wing: "B", flatNo: "302", contact: { phone: "9988776655" }, role: "Owner", isActive: true }
]);

db.tickets.insertMany([
    { ticketId: "TCK-201", flat: "B-402", category: "Plumbing", title: "Main Sink Leak", priority: "High", status: "Open" },
    { ticketId: "TCK-202", flat: "A-105", category: "Electrical", title: "MCB Tripping", priority: "High", status: "In Progress" },
    { ticketId: "TCK-203", flat: "C-404", category: "Intercom", title: "Speaker Buzz", priority: "Low", status: "Open" },
    { ticketId: "TCK-204", flat: "B-302", category: "Carpentry", title: "Clubhouse Latch", priority: "Low", status: "Resolved" }
]);

// 2. find queries
db.residents.find({ wing: "B" }, { fullName: 1, flatNo: 1, role: 1, "contact.phone": 1, _id: 0 });
db.tickets.find({ status: "Open", priority: "High" });

// 3. updateOne
db.tickets.updateOne({ ticketId: "TCK-201" }, { $set: { status: "Resolved", actualCost: 750 } });
db.tickets.find({ ticketId: "TCK-201" });

// 4. deleteOne
db.tickets.deleteOne({ ticketId: "TCK-204" });
db.tickets.countDocuments();
