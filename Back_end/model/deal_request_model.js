const db = require('../DataBase/Database');

class DealRequest {

    async RequestAsInvestor({ id, ad_id, investment_type, group_id }) {
        const [existing] = await db.execute(
            `SELECT id FROM request_for_add WHERE investor_id = ? AND add_id = ?`,
            [id, ad_id]
        );
        if (existing.length > 0) throw new Error('Request already exists');

        const [result] = await db.execute(
            `INSERT INTO request_for_add (investor_id, add_id, status, investment_type, group_id) VALUES (?, ?, 'pending', ?, ?)`,
            [id, ad_id, investment_type || 'individual', group_id || null]
        );

        // Auto-create group post for group-wise investment
        if (investment_type === 'group' && group_id) {
            const [adRows] = await db.execute(
                `SELECT ia.*, c.name AS company_name FROM investment_ads ia LEFT JOIN companies c ON ia.company_id = c.id WHERE ia.id = ?`,
                [ad_id]
            );
            const ad = adRows[0];
            if (ad) {
                const caption = JSON.stringify({
                    type: 'group_investment',
                    request_id: result.insertId,
                    ad_id: ad.id,
                    company_name: ad.company_name,
                    amount_needed: ad.amount_needed,
                    pitch: ad.pitch,
                    last_month_sale: ad.last_month_sale,
                    last_year_sale: ad.last_year_sale,
                    total_sale: ad.total_sale,
                    profit_percentage: ad.profit_percentage,
                    profit_deadline: ad.profit_deadline
                });
                await db.execute(
                    `INSERT INTO posts (investor_id, caption, photo_url, visibility, group_id) VALUES (?, ?, ?, 'private', ?)`,
                    [id, caption, ad.thumbnail_url, group_id]
                );
                // Auto-opt the initiator as 'in'
                await db.execute(
                    `INSERT INTO group_investment_participants (request_id, investor_id, status) VALUES (?, ?, 'in')`,
                    [result.insertId, id]
                );
            }
        }

        return result;
    }

    async RequestAsBusinessman({ id, ad_id }) {
        const [existing] = await db.execute(
            `SELECT id FROM request_for_add WHERE business_id = ? AND add_id = ?`,
            [id, ad_id]
        );
        if (existing.length > 0) throw new Error('Request already exists');

        const [result] = await db.execute(
            `INSERT INTO request_for_add (business_id, add_id, status) VALUES (?, ?, 'pending')`,
            [id, ad_id]
        );
        return result;
    }

    async GetReqStat({ id, role }) {
        if (role === 'investor') {
            const [requests] = await db.execute(
                `SELECT id AS request_id, add_id, status, investment_type, group_id FROM request_for_add WHERE investor_id = ?`,
                [id]
            );
            const [deals] = await db.execute(
                `SELECT ad_id FROM deals WHERE investor_id = ?`,
                [id]
            );
            const dealAdIds = new Set(deals.map(d => d.ad_id));
            const merged = requests.map(r => {
                if (dealAdIds.has(r.add_id) && r.status !== 'accepted') {
                    return { ...r, status: 'accepted' };
                }
                return r;
            });
            for (const d of deals) {
                if (!merged.some(r => r.add_id === d.ad_id)) {
                    merged.push({ add_id: d.ad_id, status: 'accepted', investment_type: 'group' });
                }
            }
            return merged;
        }
        if (role === 'businessman') {
            const [result] = await db.execute(
                `SELECT add_id, status FROM request_for_add WHERE business_id = ?`,
                [id]
            );
            return result;
        }
        return [];
    }

    async Requestlist(ad_id) {
        const [requests] = await db.execute(
            `
            SELECT
                r.id AS request_id,
                r.add_id,
                r.status,
                r.investment_type,
                r.group_id,
                'investor' AS role,
                i.id,
                i.name,
                i.phone,
                i.email,
                i.photo_url,
                i.total_investment,
                i.total_profit,
                i.grp_id
            FROM request_for_add r
            INNER JOIN investors i ON r.investor_id = i.id
            WHERE r.add_id = ?

            UNION ALL

            SELECT
                r.id AS request_id,
                r.add_id,
                r.status,
                r.investment_type,
                r.group_id,
                'businessman' AS role,
                b.id,
                b.name,
                b.phone,
                b.email,
                b.photo_url,
                NULL AS total_investment,
                NULL AS total_profit,
                b.company_id AS grp_id
            FROM request_for_add r
            INNER JOIN businessmen b ON r.business_id = b.id
            WHERE r.add_id = ?
            `,
            [ad_id, ad_id]
        );

        // Fetch ad info
        const [adRows] = await db.execute(
            `
            SELECT
                ia.id AS ad_id,
                ia.amount_needed,
                ia.pitch,
                ia.status,
                ia.last_month_sale,
                ia.last_year_sale,
                ia.total_sale,
                ia.thumbnail_url,
                b.name AS businessman_name,
                b.email AS businessman_email,
                b.phone AS businessman_phone,
                b.photo_url AS businessman_photo,
                c.name AS company_name,
                c.valuation AS company_valuation,
                c.photo_url AS company_photo
            FROM investment_ads ia
            LEFT JOIN businessmen b ON ia.businessman_id = b.id
            LEFT JOIN companies c ON ia.company_id = c.id
            WHERE ia.id = ?
            `,
            [ad_id]
        );

        return { requests, adInfo: adRows[0] || null };
    }

    async UpdateStatus({ request_id, status }) {
        const [result] = await db.execute(
            `UPDATE request_for_add SET status = ? WHERE id = ?`,
            [status, request_id]
        );
        return result;
    }

    async AcceptAndRejectRest({ request_id, ad_id }) {
        await db.execute(
            `UPDATE request_for_add SET status = 'accepted' WHERE id = ?`,
            [request_id]
        );
        await db.execute(
            `UPDATE request_for_add SET status = 'rejected' WHERE add_id = ? AND id != ?`,
            [ad_id, request_id]
        );

        const [reqRows] = await db.execute(
            `SELECT * FROM request_for_add WHERE id = ?`,
            [request_id]
        );
        const request = reqRows[0];

        const [adRows] = await db.execute(
            `SELECT * FROM investment_ads WHERE id = ?`,
            [ad_id]
        );
        const ad = adRows[0];

        // Group investment: create deal for each "in" participant
        if (request.investment_type === 'group' && request.group_id) {
            const GroupInvestment = require('./group_investment_model');
            const participants = await GroupInvestment.GetInParticipants(request_id);

            if (participants.length > 0 && ad) {
                const perPersonAmount = Math.floor(ad.amount_needed / participants.length);
                for (let i = 0; i < participants.length; i++) {
                    const amt = i === participants.length - 1
                        ? ad.amount_needed - perPersonAmount * (participants.length - 1)
                        : perPersonAmount;
                    await db.execute(
                        `INSERT INTO deals (ad_id, investor_id, amount_invested, status) VALUES (?, ?, ?, 'active')`,
                        [ad_id, participants[i].investor_id, amt]
                    );
                }
                await db.execute(
                    `UPDATE investment_ads SET status = 'funded' WHERE id = ?`,
                    [ad_id]
                );
            }
        } else {
            // Individual deal
            let investorId = request.investor_id;
            if (!investorId && request.business_id) {
                const [investorRows] = await db.execute(
                    `SELECT id FROM investors LIMIT 1`
                );
                investorId = investorRows[0]?.id || null;
            }
            if (investorId && ad) {
                await db.execute(
                    `INSERT INTO deals (ad_id, investor_id, amount_invested, status) VALUES (?, ?, ?, 'active')`,
                    [ad_id, investorId, ad.amount_needed]
                );
                await db.execute(
                    `UPDATE investment_ads SET status = 'funded' WHERE id = ?`,
                    [ad_id]
                );
            }
        }

        return { request_id, ad_id };
    }
}

module.exports = new DealRequest();