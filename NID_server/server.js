require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'investment_hub',
    waitForConnections: true,
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10
});

const db = pool.promise();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NID Verification Server</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', sans-serif; background: #0f172a; color: #e2e8f0; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
        .card { background: #1e293b; border-radius: 1rem; padding: 3rem; max-width: 480px; width: 90%; box-shadow: 0 25px 50px rgba(0,0,0,0.4); border: 1px solid #334155; }
        h1 { font-size: 1.5rem; font-weight: 900; margin-bottom: 0.5rem; color: #10b981; }
        p { color: #94a3b8; font-size: 0.875rem; line-height: 1.6; margin-bottom: 1.5rem; }
        .endpoint { background: #0f172a; border: 1px solid #334155; border-radius: 0.75rem; padding: 1rem; margin-bottom: 1rem; }
        .method { display: inline-block; background: #10b981; color: #fff; font-size: 0.65rem; font-weight: 900; padding: 0.2rem 0.5rem; border-radius: 0.25rem; letter-spacing: 0.1em; margin-right: 0.5rem; }
        .path { font-family: monospace; color: #e2e8f0; font-size: 0.875rem; }
        .desc { color: #64748b; font-size: 0.75rem; margin-top: 0.5rem; }
        .status { display: flex; align-items: center; gap: 0.5rem; margin-top: 1.5rem; padding: 0.75rem 1rem; background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.2); border-radius: 0.5rem; }
        .dot { width: 8px; height: 8px; background: #10b981; border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        .status span { font-size: 0.75rem; color: #10b981; font-weight: 700; }
    </style>
</head>
<body>
    <div class="card">
        <h1>NID Verification Server</h1>
        <p>Bangladesh National ID verification service for Investment Hub. Separate server running on port 5010.</p>
        <div class="endpoint">
            <span class="method">POST</span>
            <span class="path">/verify</span>
            <p class="desc">Body: { "nid_number": "1010101010101" } &mdash; Returns person details if NID exists.</p>
        </div>
        <div class="status">
            <div class="dot"></div>
            <span>Server Running &mdash; Port 5010</span>
        </div>
    </div>
</body>
</html>`);
});

app.post('/verify', async (req, res) => {
    try {
        const { nid_number } = req.body;
        if (!nid_number) {
            return res.status(400).json({ success: false, message: 'NID number is required' });
        }

        const [rows] = await db.execute(
            `SELECT * FROM nid_table WHERE nid_number = ?`,
            [nid_number]
        );

        if (rows.length > 0) {
            const { id, created_at, ...person } = rows[0];
            return res.json({ success: true, exists: true, data: person });
        } else {
            return res.json({ success: true, exists: false, message: 'NID not found in records' });
        }
    } catch (err) {
        console.error('NID verify error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});

const PORT = 5010;
app.listen(PORT, () => {
    console.log(`NID Server running on http://localhost:${PORT}`);
});
