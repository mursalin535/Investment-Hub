const express = require('express');
const router = express.Router();

const deal_controller = require('../controller/deal_controller');

router.post('/deal/request', deal_controller.SendingReq);
router.get('/reqstat/:id/:role', deal_controller.GetReqStat);
router.get('/requestlist/:ad_id', deal_controller.Requestlist);
router.post('/deal/request/status', deal_controller.UpdateStatus);
router.post('/deal/request/accept', deal_controller.AcceptRequest);

module.exports = router;