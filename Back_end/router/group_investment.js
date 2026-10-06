const express = require('express');
const router = express.Router();
const controller = require('../controller/group_investment_controller');

router.post('/opt', controller.OptInOut);
router.get('/participants/:request_id', controller.GetParticipants);

module.exports = router;
