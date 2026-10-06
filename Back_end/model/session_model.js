const db = require('../DataBase/Database');
const crypto = require('crypto');

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const COOKIE_NAME = 'sid';

const SessionModel = {
    create: async (userId, userRole) => {
        const sessionId = crypto.randomBytes(48).toString('hex');
        const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
        await db.execute(
            `INSERT INTO sessions (session_id, user_id, user_role, expires_at) VALUES (?, ?, ?, ?)`,
            [sessionId, userId, userRole, expiresAt]
        );
        return { sessionId, expiresAt };
    },

    findById: async (sessionId) => {
        const [rows] = await db.execute(
            `SELECT * FROM sessions WHERE session_id = ? AND expires_at > NOW()`,
            [sessionId]
        );
        return rows[0] || null;
    },

    destroy: async (sessionId) => {
        await db.execute(`DELETE FROM sessions WHERE session_id = ?`, [sessionId]);
    },

    destroyByUser: async (userId, userRole) => {
        await db.execute(
            `DELETE FROM sessions WHERE user_id = ? AND user_role = ?`,
            [userId, userRole]
        );
    },

    cleanup: async () => {
        await db.execute(`DELETE FROM sessions WHERE expires_at <= NOW()`);
    }
};

module.exports = SessionModel;
