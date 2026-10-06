const db = require('../DataBase/Database')

const POST_SELECT = `
    SELECT
        p.id,
        p.caption,
        p.photo_url,
        p.likes,
        p.created_at,
        p.investor_id,
        p.businessman_id,
        p.visibility,
        p.group_id,
        COALESCE(i.name, b.name)           AS author,
        COALESCE(i.photo_url, b.photo_url)  AS author_photo,
        g.name                              AS group_name
    FROM posts p
    LEFT JOIN investors   i ON p.investor_id    = i.id
    LEFT JOIN businessmen b ON p.businessman_id = b.id
    LEFT JOIN investment_groups g ON p.group_id  = g.id
`

class Post_model {

    static async getPublicPosts() {
        const [rows] = await db.query(
            POST_SELECT + ` WHERE p.visibility = 'public' ORDER BY p.created_at DESC`
        )
        return rows
    }

    static async getGroupPosts(group_id, userId) {
        const [rows] = await db.query(
            POST_SELECT + ` WHERE p.visibility = 'private' AND p.group_id = ? ORDER BY p.created_at DESC`,
            [group_id]
        )
        return rows
    }

    static async create({ caption, photo_url, investor_id, businessman_id, visibility, group_id }) {
        const [result] = await db.query(
            `INSERT INTO posts (caption, photo_url, investor_id, businessman_id, visibility, group_id)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [caption, photo_url, investor_id || null, businessman_id || null, visibility || 'public', group_id || null]
        )
        const [rows] = await db.query(
            POST_SELECT + ` WHERE p.id = ?`,
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
            POST_SELECT + ` WHERE p.id = ?`,
            [id]
        )
        return rows[0]
    }
}

module.exports = Post_model
