const db = require('../DataBase/Database')

class Post_model {

    static async getAll() {
        const [rows] = await db.query(`
            SELECT
                p.id,
                p.caption,
                p.photo_url,
                p.likes,
                p.created_at,
                p.investor_id,
                p.businessman_id,
                COALESCE(i.name, b.name)           AS author,
                COALESCE(i.photo_url, b.photo_url)  AS author_photo
            FROM posts p
            LEFT JOIN investors   i ON p.investor_id    = i.id
            LEFT JOIN businessmen b ON p.businessman_id = b.id
            ORDER BY p.created_at DESC
        `)
        return rows
    }

    static async create({ caption, photo_url, investor_id, businessman_id }) {
        const [result] = await db.query(
            `INSERT INTO posts (caption, photo_url, investor_id, businessman_id)
             VALUES (?, ?, ?, ?)`,
            [caption, photo_url, investor_id, businessman_id]
        )
        const [rows] = await db.query(
            `SELECT
                p.id,
                p.caption,
                p.photo_url,
                p.likes,
                p.created_at,
                p.investor_id,
                p.businessman_id,
                COALESCE(i.name, b.name)           AS author,
                COALESCE(i.photo_url, b.photo_url)  AS author_photo
             FROM posts p
             LEFT JOIN investors   i ON p.investor_id    = i.id
             LEFT JOIN businessmen b ON p.businessman_id = b.id
             WHERE p.id = ?`,
            [result.insertId]
        )
        return rows[0]
    }

    static async incrementLike(id) {
        await db.query(
            `UPDATE posts SET likes = likes + 1 WHERE id = ?`,
            [id]
        )
        const [rows] = await db.query(
            `SELECT
                p.id,
                p.caption,
                p.photo_url,
                p.likes,
                p.created_at,
                p.investor_id,
                p.businessman_id,
                COALESCE(i.name, b.name)           AS author,
                COALESCE(i.photo_url, b.photo_url)  AS author_photo
             FROM posts p
             LEFT JOIN investors   i ON p.investor_id    = i.id
             LEFT JOIN businessmen b ON p.businessman_id = b.id
             WHERE p.id = ?`,
            [id]
        )
        return rows[0]
    }
}

module.exports = Post_model