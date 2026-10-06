const db = require('../DataBase/Database.js');

const CompanyModel = {
    // ============================================
    //              GET ALL COMPANIES
    // ============================================
    getAll: async () => {
        const [rows] = await db.execute('SELECT * FROM companies');
        return rows;
    },

    // ============================================
    //              GET ONE COMPANY
    // ============================================
    findCompanyById: async (id) => {
        const [rows] = await db.execute('SELECT * FROM companies WHERE id = ?', [id]);
        return rows[0];
    },


    // ============================================
    //       GET COMPANIES BY MEMBER ID
    // ============================================
    getByMemberId: async (id) => {
        const [rows] = await db.execute(`
            SELECT c.* FROM companies c
            INNER JOIN businessmen b ON c.id = b.company_id
            WHERE b.id = ?
        `, [id]);
        return rows[0];
    },

    // ============================================
    //       GET ALL MEMBERS IN A COMPANY
    // ============================================
    getCompanyMembers: async (companyId) => {
        const [rows] = await db.execute(`
            SELECT id, name, email, phone, photo_url, company_photo
            FROM businessmen
            WHERE company_id = ?
            ORDER BY name ASC
        `, [companyId]);
        return rows || [];
    },

    // ============================================
    //            CREATE COMPANY (no admin_id yet)
    // ============================================
    createCompany: async (companyData) => {
        const { name, valuation, photo_url } = companyData;
        const sql = `INSERT INTO companies (name, valuation, photo_url) VALUES (?, ?, ?)`;
        const [result] = await db.execute(sql, [name.trim(), valuation || 0, photo_url || null]);
        return result.insertId;   // ← returns the new id directly
    },

  

    // ============================================
    //            SET ADMIN FOR COMPANY
    // ============================================
    setAdmin: async (companyId, adminId) => {
        const sql = 'UPDATE companies SET admin_id = ? WHERE id = ?';
        const [result] = await db.execute(sql, [adminId, companyId]);
        return result.affectedRows;
    },

    // ============================================
    //            UPDATE COMPANY STATS
    // ============================================
    updateStats: async (id, deals, profit) => {
        const sql = 'UPDATE companies SET total_deals = ?, total_profit = ? WHERE id = ?';
        return await db.execute(sql, [deals, profit, id]);
    },

    // ============================================
    //            ADD MEMBER (BUSINESSMAN)
    // ============================================
    addMember: async (company_id, businessman_id) => {
        const sql = 'UPDATE businessmen SET company_id = ? WHERE id = ?';
        const [result] = await db.execute(sql, [company_id, businessman_id]);
        return result.affectedRows;
    },

    // ============================================
    //            DROP MEMBER
    // ============================================
    dropMember: async (businessman_id) => {
        const sql = 'UPDATE businessmen SET company_id = NULL WHERE id = ?';
        const [result] = await db.execute(sql, [businessman_id]);
        return result.affectedRows;
    },

    // ============================================
    //            DELETE COMPANY
    // ============================================
    delete: async (id) => {
        await db.execute('UPDATE businessmen SET company_id = NULL WHERE company_id = ?', [id]);
        const [result] = await db.execute('DELETE FROM companies WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

module.exports = CompanyModel;