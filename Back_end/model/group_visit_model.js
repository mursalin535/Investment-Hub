const db = require('../DataBase/Database');

const POST_SELECT = `
    SELECT
        p.id, p.caption, p.photo_url, p.likes, p.created_at,
        p.investor_id, p.businessman_id, p.visibility, p.group_id,
        COALESCE(i.name, b.name)           AS author,
        COALESCE(i.photo_url, b.photo_url)  AS author_photo
    FROM posts p
    LEFT JOIN investors   i ON p.investor_id    = i.id
    LEFT JOIN businessmen b ON p.businessman_id = b.id
`;

class GroupVisitModel {

    static async getGroupById(groupId) {
        const [rows] = await db.execute(
            `SELECT * FROM investment_groups WHERE id = ?`,
            [groupId]
        );
        return rows[0] || null;
    }

    static async getGroupMembers(groupId) {
        const [rows] = await db.execute(
            `SELECT id, name, email, phone, photo_url, total_investment, total_profit
             FROM investors WHERE grp_id = ? ORDER BY name ASC`,
            [groupId]
        );
        return rows;
    }

    static async getGroupAdmin(groupId) {
        const [rows] = await db.execute(
            `SELECT id, name, email, phone, photo_url
             FROM investors WHERE id = (
                SELECT admin_id FROM investment_groups WHERE id = ?
             )`,
            [groupId]
        );
        return rows[0] || null;
    }

    static async getGroupPosts(groupId) {
        const [rows] = await db.execute(
            POST_SELECT + ` WHERE p.visibility = 'private' AND p.group_id = ? ORDER BY p.created_at DESC`,
            [groupId]
        );
        return rows;
    }

    static async sendJoinRequest(groupId, investorId) {
        const [existing] = await db.execute(
            `SELECT id, status FROM group_join_requests WHERE group_id = ? AND investor_id = ?`,
            [groupId, investorId]
        );
        if (existing.length > 0) {
            return { status: existing[0].status, message: 'Request already exists' };
        }
        const [result] = await db.execute(
            `INSERT INTO group_join_requests (group_id, investor_id) VALUES (?, ?)`,
            [groupId, investorId]
        );
        return { status: 'pending', insertId: result.insertId };
    }

    static async getJoinRequests(groupId) {
        const [rows] = await db.execute(
            `SELECT r.id AS request_id, r.group_id, r.investor_id, r.status, r.created_at,
                    i.name, i.email, i.phone, i.photo_url, i.total_investment, i.total_profit
             FROM group_join_requests r
             INNER JOIN investors i ON r.investor_id = i.id
             WHERE r.group_id = ?
             ORDER BY r.created_at DESC`,
            [groupId]
        );
        return rows;
    }

    static async acceptJoinRequest(requestId) {
        const [rows] = await db.execute(
            `SELECT * FROM group_join_requests WHERE id = ?`,
            [requestId]
        );
        const request = rows[0];
        if (!request) throw new Error('Request not found');

        await db.execute(
            `UPDATE group_join_requests SET status = 'accepted' WHERE id = ?`,
            [requestId]
        );

        await db.execute(
            `UPDATE investors SET grp_id = ? WHERE id = ?`,
            [request.group_id, request.investor_id]
        );

        return request;
    }

    static async rejectJoinRequest(requestId) {
        await db.execute(
            `UPDATE group_join_requests SET status = 'rejected' WHERE id = ?`,
            [requestId]
        );
        return { requestId };
    }

    static async getInvestorGroupStatus(investorId) {
        const [rows] = await db.execute(
            `SELECT grp_id FROM investors WHERE id = ?`,
            [investorId]
        );
        return rows[0]?.grp_id || null;
    }
}

module.exports = GroupVisitModel;
