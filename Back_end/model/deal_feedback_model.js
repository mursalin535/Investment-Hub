const db = require('../DataBase/Database');

class DealFeedback {

    async submitFeedback(ad_id, feedback_text) {
        const [dealRows] = await db.execute(
            `SELECT id FROM deals WHERE ad_id = ? LIMIT 1`,
            [ad_id]
        );
        if (dealRows.length === 0) throw new Error('No deal found for this ad');
        const deal_id = dealRows[0].id;

        const [existing] = await db.execute(
            `SELECT id FROM deal_feedback WHERE deal_id = ?`,
            [deal_id]
        );
        if (existing.length > 0) {
            await db.execute(
                `UPDATE deal_feedback SET feedback_text = ? WHERE deal_id = ?`,
                [feedback_text, deal_id]
            );
        } else {
            await db.execute(
                `INSERT INTO deal_feedback (deal_id, feedback_text) VALUES (?, ?)`,
                [deal_id, feedback_text]
            );
        }
        return await this.getFeedback(deal_id);
    }

    async getFeedback(deal_id) {
        const [rows] = await db.execute(
            `SELECT * FROM deal_feedback WHERE deal_id = ?`,
            [deal_id]
        );
        return rows[0] || null;
    }

    async getFeedbackByAd(ad_id) {
        const [rows] = await db.execute(
            `SELECT df.* FROM deal_feedback df
             INNER JOIN deals d ON df.deal_id = d.id
             WHERE d.ad_id = ?`,
            [ad_id]
        );
        return rows[0] || null;
    }
}

module.exports = new DealFeedback();
