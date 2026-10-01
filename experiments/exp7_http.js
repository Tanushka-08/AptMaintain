// experiments/exp7_http.js
const http = require('http');

const PORT = 4000;
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    if (req.url === '/api/society-info') {
        res.writeHead(200);
        res.end(JSON.stringify({
            societyName: 'AptMaintain Co-operative Housing Society',
            wings: ['A', 'B', 'C'],
            totalFlats: 120,
            activeMaintenanceCycle: 'October 2026',
            status: 'Operational'
        }));
    } else {
        res.writeHead(200);
        res.end(JSON.stringify({ status: 'Healthy', uptime: process.uptime() }));
    }
});

server.listen(PORT, () => {
    console.log(`[AptMaintain HTTP Engine]: Listening on http://localhost:${PORT}`);
});
