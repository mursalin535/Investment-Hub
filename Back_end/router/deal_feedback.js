const express = require('express');
const router = express.Router();
const controller = require('../controller/deal_feedback_controller');

router.post('/feedback', controller.submitFeedback);
router.get('/feedback/:deal_id', controller.getFeedback);
router.get('/feedback/ad/:ad_id', controller.getFeedbackByAd);

module.exports = router;
