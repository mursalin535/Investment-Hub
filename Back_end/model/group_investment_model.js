const db = require('../DataBase/Database');

class GroupInvestment {

    async OptInOut({ request_id, investor_id, status }) {
        const [existing] = await db.execute(
            `SELECT id FROM group_investment_participants WHERE request_id = ? AND investor_id = ?`,
            [request_id, investor_id]
        );
        if (existing.length > 0) {
            await db.execute(
                `UPDATE group_investment_participants SET status = ? WHERE request_id = ? AND investor_id = ?`,
                [status, request_id, investor_id]
            );
        } else {
            await db.execute(
                `INSERT INTO group_investment_participants (request_id, investor_id, status) VALUES (?, ?, ?)`,
                [request_id, investor_id, status]
            );
        }
        return await this.GetParticipants(request_id);
    }

    async GetParticipants(request_id) {
        const [rows] = await db.execute(
            `SELECT gp.*, i.name, i.email, i.photo_url, i.total_investment, i.total_profit
             FROM group_investment_participants gp
             INNER JOIN investors i ON gp.investor_id = i.id
             WHERE gp.request_id = ?`,
            [request_id]
        );
        return rows;
    }

    async GetInParticipants(request_id) {
        const [rows] = await db.execute(
            `SELECT gp.investor_id, i.name, i.email, i.phone, i.photo_url, i.total_investment, i.total_profit
             FROM group_investment_participants gp
             INNER JOIN investors i ON gp.investor_id = i.id
             WHERE gp.request_id = ? AND gp.status = 'in'`,
            [request_id]
        );
        return rows;
    }

    async GetRequestByGroupId(request_id) {
        const [rows] = await db.execute(
            `SELECT * FROM request_for_add WHERE id = ?`,
            [request_id]
        );
        return rows[0];
    }
}

module.exports = new GroupInvestment();
