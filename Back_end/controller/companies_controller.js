const CompanyModel = require('../model/company_model');

const companies_controller = {
    getAll: (req, res) => {
        CompanyModel.getAll().then((companies) => {
            res.status(200).json({
                success: true,
                data: companies
            })
        }).catch((err) => {
            console.log("error in controller:", err);
            res.status(500).json({ success: false, message: 'Error fetching companies' });
        })
    },
    getByABusinessId: (req, res) => {
        const {id}=req.params;
        CompanyModel.getByMemberId(id).then((companies)=>{
            res.status(200).json({
                success: true,
                data:companies
            })
        }).catch((err)=>{
            console.log("error in controller:", err);
        })
    }
}

module.exports = companies_controller;