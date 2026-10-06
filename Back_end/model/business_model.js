const db = require('../DataBase/Database.js');

const BusinessModel = {
    findUserByEmail: async (email) => {
        const [rows] = await db.execute('SELECT * FROM businessmen WHERE email = ?', [email]);
        return rows[0];
    },

    findUserById: async (id) => {
        const [rows] = await db.execute('SELECT * FROM businessmen WHERE id = ?', [id]);
        return rows[0];
    },

    // ✅ FIX 3: Insert company_photo into businessmen table
    createBusinessman: async (userData) => {
        const { name, email, phone, password, photo_url, company_id, company_photo, nid_number } = userData;
        const sql = `
            INSERT INTO businessmen (name, email, phone, pass, photo_url, company_id, company_photo, nid_number)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.execute(sql, [name, email, phone, password, photo_url, company_id, company_photo, nid_number || null]);
        return result;
    }
};

module.exports = BusinessModel;