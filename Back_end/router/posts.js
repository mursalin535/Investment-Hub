const express = require('express')
const router  = express.Router()
const multer  = require('multer')
const path    = require('path')
const posts_controller = require('../controller/posts_controller')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'))
    },
    filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, unique + path.extname(file.originalname))
    }
})

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }
})

router.get('/posts',             posts_controller.getAllPosts)
router.post('/posts',            upload.single('photo'), posts_controller.createPost)
router.patch('/posts/:id/like',  posts_controller.likePost)

module.exports = router