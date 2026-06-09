const Investment_ad_model = require('../model/Investment_ad_model');
const multer = require('multer');
const path   = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
    filename:    (req, file, cb) => cb(null, Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname))
});
const upload = multer({ storage });

const investment_ad_controller = {

    getInvestmentAds: async (req, res) => {
        try {
            const result = await Investment_ad_model.getInvestmentAds();
            res.status(200).json({ success: true, data: result });
        } catch (err) {
            console.log("error in controller:", err);
            res.status(500).json({ success: false, message: err.message });
        }
    },

    addInvestmentAd: [
        upload.single('thumbnail'),
        async (req, res) => {
            try {
                const {
                    company_id, businessman_id, amount_needed,
                    pitch, last_month_sale, last_year_sale, total_sale
                } = req.body;

                const thumbnail_url = req.file?.filename || null;

                const result = await Investment_ad_model.addInvestmentAd({
                    company_id, businessman_id, amount_needed,
                    pitch, last_month_sale, last_year_sale,
                    total_sale, thumbnail_url
                });

                res.status(200).json({ success: true, data: result });
            } catch (err) {
                console.log("error in controller:", err);
                res.status(500).json({ success: false, message: err.message });
            }
        }
    ]
};

module.exports = investment_ad_controller;