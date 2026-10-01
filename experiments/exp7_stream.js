// experiments/exp7_stream.js
const fs = require('fs');
const path = require('path');

const targetLogFile = path.join(__dirname, 'society_activity.log');
if (!fs.existsSync(targetLogFile)) {
    fs.writeFileSync(targetLogFile, '[INIT] AptMaintain Society Activity Log Started.\n[LOG] Sample Maintenance Record.\n');
}

const readStream = fs.createReadStream(targetLogFile, { highWaterMark: 64, encoding: 'utf8' });
let count = 0;
readStream.on('data', (chunk) => {
    count++;
    console.log(`[Stream Chunk #${count}]: Read ${Buffer.from(chunk).length} bytes -> "${chunk.trim().slice(0, 30)}..."`);
});
readStream.on('end', () => {
    console.log(`\n--- Stream Read Completed (${count} chunks processed) ---`);
});
