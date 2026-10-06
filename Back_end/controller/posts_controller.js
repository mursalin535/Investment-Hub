const Post_model = require('../model/posts_model')

const posts_controller = {

    getPublicPosts: async (req, res) => {
        try {
            const posts = await Post_model.getPublicPosts()
            res.json({ success: true, data: posts })
        } catch (err) {
            res.status(500).json({ success: false, message: err.message })
        }
    },

    getGroupPosts: async (req, res) => {
        try {
            const { group_id } = req.params
            const { user_id } = req.query
            const posts = await Post_model.getGroupPosts(group_id, user_id)
            res.json({ success: true, data: posts })
        } catch (err) {
            res.status(500).json({ success: false, message: err.message })
        }
    },

    createPost: async (req, res) => {
        try {
            const { caption, investor_id, businessman_id, visibility, group_id } = req.body
            const photo_url = req.file ? req.file.filename : null

            const newPost = await Post_model.create({
                caption,
                photo_url,
                investor_id:    investor_id    || null,
                businessman_id: businessman_id || null,
                visibility:     visibility     || 'public',
                group_id:       group_id       || null,
            })
            res.status(201).json({ success: true, data: newPost })
        } catch (err) {
            res.status(500).json({ success: false, message: err.message })
        }
    },

    likePost: async (req, res) => {
        try {
            const { id } = req.params
            const updated = await Post_model.incrementLike(id)
            res.json({ success: true, data: updated })
        } catch (err) {
            res.status(500).json({ success: false, message: err.message })
        }
    },
}

module.exports = posts_controller
