const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const groups_controller = require('../controller/groups_controller');

// ── Multer Config ──────────────────────────────────────────────
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, unique + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// ✅ Put specific routes BEFORE generic ones
router.post('/groups/create', upload.single('photo'), groups_controller.create);
router.get('/groups/yourgroup/:id', groups_controller.getByAdminId);
router.get('/groups', groups_controller.getAll);

module.exports = router;