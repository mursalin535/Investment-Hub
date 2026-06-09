const express=require('express');
const router=express.Router();
const conpanies_controller=require('../controller/companies_controller');

router.get('/companies',conpanies_controller.getAll);
router.get('/companies/yourcompany/:id',conpanies_controller.getByABusinessId);

module.exports=router;
