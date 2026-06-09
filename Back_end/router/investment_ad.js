const express = require('express');
const router  = express.Router();
const investment_ad_controller = require('../controller/investment_ad_controller');

router.get('/investment/get', investment_ad_controller.getInvestmentAds);
router.post('/investment/add', investment_ad_controller.addInvestmentAd);

module.exports = router;