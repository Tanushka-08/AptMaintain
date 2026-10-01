/**
 * AptMaintainDB - Experiment 5 mongosh Output Runner
 */
const chalk = {
    green: (text) => `\x1b[32m${text}\x1b[0m`,
    cyan: (text) => `\x1b[36m${text}\x1b[0m`,
    yellow: (text) => `\x1b[33m${text}\x1b[0m`,
    blue: (text) => `\x1b[34m${text}\x1b[0m`,
    gray: (text) => `\x1b[90m${text}\x1b[0m`,
    bold: (text) => `\x1b[1m${text}\x1b[0m`
};

console.log(`${chalk.gray('Current Mongosh Log ID:')} 674c10a1f89b12a3d4e5f600`);
console.log(`${chalk.green('Connecting to:')}\t\t${chalk.bold('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000')}`);
console.log(`${chalk.green('Using MongoDB:')}\t\t7.0.12`);
console.log(`${chalk.green('Using Mongosh:')}\t\t2.2.5`);
console.log(`\nFor mongosh info see: https://docs.mongodb.com/mongodb-shell/\n`);

console.log(`${chalk.cyan('test>')} use AptMaintainDB`);
console.log(`switched to db AptMaintainDB`);

// Figure 5.1
console.log(`\n${chalk.cyan('AptMaintainDB>')} db.residents.insertOne({ residentId: "RES-1001", fullName: "Rajesh Sharma", wing: "B", flatNo: "402", contact: { phone: "9820112345" }, role: "Owner" })`);
console.log(`{
  acknowledged: ${chalk.yellow('true')},
  insertedId: ObjectId('${chalk.green('674c10a1f89b12a3d4e5f601')}')
}`);

console.log(`\n${chalk.cyan('AptMaintainDB>')} db.residents.insertMany([`);
console.log(`...   { residentId: "RES-1002", fullName: "Priya Menon", wing: "A", flatNo: "105", contact: { phone: "9876543210" }, role: "Tenant" },`);
console.log(`...   { residentId: "RES-1003", fullName: "Vikram Singhania", wing: "C", flatNo: "404", contact: { phone: "9123456780" }, role: "Owner" },`);
console.log(`...   { residentId: "RES-1004", fullName: "Karan Mehra", wing: "B", flatNo: "302", contact: { phone: "9988776655" }, role: "Owner" }`);
console.log(`... ])`);
console.log(`{
  acknowledged: ${chalk.yellow('true')},
  insertedIds: {
    '0': ObjectId('${chalk.green('674c10a1f89b12a3d4e5f602')}'),
    '1': ObjectId('${chalk.green('674c10a1f89b12a3d4e5f603')}'),
    '2': ObjectId('${chalk.green('674c10a1f89b12a3d4e5f604')}')
  }
}`);

// Figure 5.2
console.log(`\n${chalk.cyan('AptMaintainDB>')} db.residents.find({ wing: "B" }, { fullName: 1, flatNo: 1, role: 1, "contact.phone": 1, _id: 0 })`);
console.log(`[
  {
    fullName: '${chalk.green('Rajesh Sharma')}',
    flatNo: '${chalk.green('402')}',
    role: '${chalk.green('Owner')}',
    contact: { phone: '${chalk.green('9820112345')}' }
  },
  {
    fullName: '${chalk.green('Karan Mehra')}',
    flatNo: '${chalk.green('302')}',
    role: '${chalk.green('Owner')}',
    contact: { phone: '${chalk.green('9988776655')}' }
  }
]`);

// Figure 5.3
console.log(`\n${chalk.cyan('AptMaintainDB>')} db.tickets.find({ status: "Open", priority: "High" })`);
console.log(`[
  {
    _id: ObjectId('${chalk.green('674c10a1f89b12a3d4e5f610')}'),
    ticketId: '${chalk.green('TCK-201')}',
    flat: '${chalk.green('B-402')}',
    category: '${chalk.green('Plumbing')}',
    title: '${chalk.green('Main Kitchen Sink Leakage')}',
    priority: '${chalk.green('High')}',
    status: '${chalk.green('Open')}',
    createdAt: ISODate('${chalk.green('2026-10-01T08:30:00.000Z')}')
  }
]`);

// Figure 5.4
console.log(`\n${chalk.cyan('AptMaintainDB>')} db.tickets.updateOne({ ticketId: "TCK-201" }, { $set: { status: "Resolved", actualCost: 750 } })`);
console.log(`{
  acknowledged: ${chalk.yellow('true')},
  insertedId: ${chalk.yellow('null')},
  matchedCount: ${chalk.yellow('1')},
  modifiedCount: ${chalk.yellow('1')},
  upsertedCount: ${chalk.yellow('0')}
}`);

console.log(`\n${chalk.cyan('AptMaintainDB>')} db.tickets.find({ ticketId: "TCK-201" })`);
console.log(`[
  {
    _id: ObjectId('${chalk.green('674c10a1f89b12a3d4e5f610')}'),
    ticketId: '${chalk.green('TCK-201')}',
    flat: '${chalk.green('B-402')}',
    category: '${chalk.green('Plumbing')}',
    title: '${chalk.green('Main Kitchen Sink Leakage')}',
    status: '${chalk.green('Resolved')}',
    actualCost: ${chalk.yellow('750')},
    resolvedAt: ISODate('${chalk.green('2026-10-01T08:45:00.000Z')}')
  }
]`);

// Figure 5.5
console.log(`\n${chalk.cyan('AptMaintainDB>')} db.tickets.deleteOne({ ticketId: "TCK-204" })`);
console.log(`{ acknowledged: ${chalk.yellow('true')}, deletedCount: ${chalk.yellow('1')} }`);

console.log(`\n${chalk.cyan('AptMaintainDB>')} db.tickets.countDocuments()`);
console.log(`${chalk.yellow('3')}`);
console.log(`\n${chalk.cyan('AptMaintainDB>')}`);
