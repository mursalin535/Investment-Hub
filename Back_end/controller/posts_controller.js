const Post_model = require('../model/posts_model')

const posts_controller = {

    getAllPosts: async (req, res) => {
        try {
            const posts = await Post_model.getAll()
            res.json(posts)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },

    createPost: async (req, res) => {
        try {
            const { caption, investor_id, businessman_id } = req.body
            const photo_url = req.file ? req.file.filename : null

            const newPost = await Post_model.create({
                caption,
                photo_url,
                investor_id:    investor_id    || null,
                businessman_id: businessman_id || null,
            })
            res.status(201).json(newPost)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },

    likePost: async (req, res) => {
        try {
            const { id } = req.params
            const updated = await Post_model.incrementLike(id)
            res.json(updated)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
}

module.exports = posts_controller