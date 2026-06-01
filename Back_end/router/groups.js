const express = require('express');
const router = express.Router();

const groups_controller = require('../controller/groups_controller');

// ✅ Put specific routes BEFORE generic ones
router.get('/groups/yourgroup/:id', groups_controller.getByAdminId);
router.get('/groups', groups_controller.getAll);

module.exports = router;