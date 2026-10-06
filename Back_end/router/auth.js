const express = require('express');
const router = express.Router();
const { logout_controller, me_controller } = require('../controller/auth_controller');
const { requireAuth } = require('../middleware/auth');

router.post('/api/logout', logout_controller);
router.get('/api/me', requireAuth, me_controller);

module.exports = router;
