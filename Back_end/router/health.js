const express = require('express');
const router  = express.Router();
const health_controller=require('../controller/health_controller');

router.get('/',health_controller)

module.exports=router;