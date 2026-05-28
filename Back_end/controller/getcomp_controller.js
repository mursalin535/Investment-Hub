const CompanyModel = require('../model/company_model');

async function getcomp_controller(req, res) {
    try {
        const rows = await CompanyModel.getAll();

        // Map DB field names to what frontend expects
        const companies = rows.map(c => ({
            id:        c.id,
            name:      c.name,
            valuation: c.valuation,
            logo:      c.photo_url
                           ? `http://localhost:5009/uploads/${c.photo_url}`
                           : null,
            posts: []
        }))

        res.status(200).json({ success: true, data: companies });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to fetch companies' });
    }
}

module.exports = getcomp_controller;