const express = require('express');
const router = express.Router();

const deal_controller = require('../controller/deal_controller');

router.post('/deal/request', deal_controller.SendingReq);

router.get(
    '/reqstat/:id/:role',
    deal_controller.GetReqStat
);
router.get("/requestlist/:ad_id",deal_controller.Requestlist);

module.exports = router;