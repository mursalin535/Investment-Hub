const express = require('express');
const router = express.Router();
const group_visit_controller = require('../controller/group_visit_controller');

router.get('/groups/visit/:group_id', group_visit_controller.getGroupDetails);
router.post('/groups/join', group_visit_controller.sendJoinRequest);
router.post('/groups/join/accept', group_visit_controller.acceptJoinRequest);
router.post('/groups/join/reject', group_visit_controller.rejectJoinRequest);

module.exports = router;
