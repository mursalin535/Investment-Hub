const express  = require('express');
const router   = express.Router();
const multer   = require('multer');
const path     = require('path');
const { signup_controller, validateSignup } = require('../controller/signup_controller.js');
const { login_controller } = require('../controller/login_controller.js');
const { validationResult } = require('express-validator');

// ── Multer Config ──────────────────────────────────────────────
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, unique + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// ── Validation Error Handler ──────────────────────────────────
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }
    next();
};

// ── Route ──────────────────────────────────────────────────────

// ── Multer Error Handler ─────────────────────────────────────
const handleMulterErrors = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'File is too large. Maximum size allowed is 10MB.'
            });
        }
        return res.status(400).json({
            success: false,
            message: `Upload error: ${err.message}`
        });
    }
    next(err);
};

// Use .fields to accept multiple specific files
const cpUpload = upload.fields([
    { name: 'personalPhoto', maxCount: 1 },
    { name: 'companyLogo', maxCount: 1 }
]);

router.post('/signup', cpUpload, handleMulterErrors, validateSignup, handleValidationErrors, signup_controller);

router.post('/login', login_controller);

module.exports = router;