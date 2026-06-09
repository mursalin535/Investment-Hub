const db = require('../DataBase/Database');

class DealRequest {

    async RequestAsInvestor({ id, ad_id }) {

        const [existing] = await db.execute(
            `
            SELECT id
            FROM request_for_add
            WHERE investor_id = ?
            AND add_id = ?
            `,
            [id, ad_id]
        );

        if (existing.length > 0) {
            throw new Error('Request already exists');
        }

        const [result] = await db.execute(
            `
            INSERT INTO request_for_add
            (
                investor_id,
                add_id,
                status
            )
            VALUES
            (?, ?, 'pending')
            `,
            [id, ad_id]
        );

        return result;
    }

    async RequestAsBusinessman({ id, ad_id }) {

        const [existing] = await db.execute(
            `
            SELECT id
            FROM request_for_add
            WHERE business_id = ?
            AND add_id = ?
            `,
            [id, ad_id]
        );

        if (existing.length > 0) {
            throw new Error('Request already exists');
        }

        const [result] = await db.execute(
            `
            INSERT INTO request_for_add
            (
                business_id,
                add_id,
                status
            )
            VALUES
            (?, ?, 'pending')
            `,
            [id, ad_id]
        );

        return result;
    }

    async GetReqStat({ id, role }) {

        if (role === 'investor') {

            const [result] = await db.execute(
                `
                SELECT
                    add_id,
                    status
                FROM request_for_add
                WHERE investor_id = ?
                `,
                [id]
            );

            return result;
        }

        if (role === 'businessman') {

            const [result] = await db.execute(
                `
                SELECT
                    add_id,
                    status
                FROM request_for_add
                WHERE business_id = ?
                `,
                [id]
            );

            return result;
        }

        return [];
    }

    async Requestlist(ad_id) {

        const [result] = await db.execute(
            `
            SELECT
                r.id AS request_id,
                r.add_id,
                r.status,

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
            INNER JOIN investors i
                ON r.investor_id = i.id
            WHERE r.add_id = ?

            UNION ALL

            SELECT
                r.id AS request_id,
                r.add_id,
                r.status,

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
            INNER JOIN businessmen b
                ON r.business_id = b.id
            WHERE r.add_id = ?
            `,
            [ad_id, ad_id]
        );

        return result;
    }
}

module.exports = new DealRequest();