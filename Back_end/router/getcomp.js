const express = require('express');
const router = express.Router();
const getcomp_controller = require('../controller/getcomp_controller');

// fix 1: was getcomp_controller.js (calling .js property, not the function)
router.get('/getcomp', getcomp_controller);

module.exports = router;