const db = require('../DataBase/Database.js');

const SignupModel = {
    // Check if email already exists
    findUserByEmail: async (email) => {
        const [rows] = await db.execute('SELECT * FROM investors WHERE email = ?', [email]);
        return rows[0];
    },

    // ✅ Find investor by ID
    findUserById: async (id) => {
        const [rows] = await db.execute('SELECT * FROM investors WHERE id = ?', [id]);
        return rows[0];
    },

    // ✅ Find all investors in a specific group
    findUsersByGroup: async (groupId) => {
        const [rows] = await db.execute('SELECT * FROM investors WHERE grp_id = ?', [groupId]);
        return rows; // Returns an array of investors
    },

    // Insert new investor into database
    createInvestor: async (userData) => {
        const { name, email, phone, password, photo_url, nid_number } = userData;
        const sql = `
            INSERT INTO investors (name, email, phone, pass, photo_url, nid_number) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.execute(sql, [name, email, phone, password, photo_url, nid_number || null]);
        return result;
    }
};

module.exports = SignupModel;