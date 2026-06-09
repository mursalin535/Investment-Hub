const db = require('../DataBase/Database');

class Investment_ad_model {

    async addInvestmentAd({ company_id, businessman_id, amount_needed, pitch, last_month_sale, last_year_sale, total_sale, thumbnail_url }) {
        const [result] = await db.execute(`
            INSERT INTO investment_ads
                (company_id, businessman_id, amount_needed, pitch, last_month_sale, last_year_sale, total_sale, thumbnail_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [company_id, businessman_id, amount_needed, pitch, last_month_sale, last_year_sale, total_sale, thumbnail_url]);
        return result;
    }

    async getInvestmentAds() {
        const [rows] = await db.execute(`
            SELECT
                ia.id                AS ad_id,
                ia.amount_needed,
                ia.pitch,
                ia.status,
                ia.last_month_sale,
                ia.last_year_sale,
                ia.total_sale,
                ia.thumbnail_url,

                b.id                 AS businessman_id,
                b.name               AS businessman_name,
                b.email              AS businessman_email,
                b.phone              AS businessman_phone,
                b.photo_url          AS businessman_photo,

                c.id                 AS company_id,
                c.name               AS company_name,
                c.valuation          AS company_valuation,
                c.total_deals        AS company_total_deals,
                c.total_profit       AS company_total_profit,
                c.photo_url          AS company_photo

            FROM investment_ads ia
            LEFT JOIN businessmen b ON ia.businessman_id = b.id
            LEFT JOIN companies  c ON ia.company_id     = c.id
            ORDER BY ia.id DESC
        `);
        return rows;
    }
}

module.exports = new Investment_ad_model();