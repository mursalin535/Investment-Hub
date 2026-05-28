const db = require('../DataBase/Database.js');

const CompanyModel = {
    createCompany: async (companyData) => {
        const { name, valuation, photo_url } = companyData;
        const sql = `INSERT INTO companies (name, valuation, photo_url) VALUES (?, ?, ?)`;
        const [result] = await db.execute(sql, [name.trim(), valuation || 0, photo_url || null]);
        return result;
    },

    findCompanyById: async (id) => {
        const [rows] = await db.execute('SELECT * FROM companies WHERE id = ?', [id]);
        return rows[0];
    },

    updateStats: async (id, deals, profit) => {
        const sql = 'UPDATE companies SET total_deals = ?, total_profit = ? WHERE id = ?';
        return await db.execute(sql, [deals, profit, id]);
    },

    // fix 3: added return, await, destructured [rows], lowercase table name
    getAll: async () => {
        const [rows] = await db.execute('SELECT * FROM companies');
        return rows;
    }
};

module.exports = CompanyModel;