const DealRequest = require('../model/deal_request_model');

const deal_controller = {

    SendingReq: async (req, res) => {
        const { id, ad_id, role } = req.body;
        try {
            let result;
            if (role === 'investor') {
                result = await DealRequest.RequestAsInvestor({ id, ad_id });
            } else if (role === 'businessman') {
                result = await DealRequest.RequestAsBusinessman({ id, ad_id });
            } else {
                return res.status(400).json({ success: false, message: 'Invalid role' });
            }
            return res.json({ success: true, data: result });
        } catch (error) {
            console.log('error in controller', error);
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    GetReqStat: async (req, res) => {
        try {
            const { id, role } = req.params;
            const data = await DealRequest.GetReqStat({ id, role });
            return res.json({ success: true, data });
        } catch (err) {
            console.log('error occured in controller:', err);
            return res.status(500).json({ success: false, data: [] });
        }
    },

    // --- COMPLETED METHOD ---
    Requestlist: async (req, res) => {
        try {
            const { ad_id } = req.params; // Fixed: removed illegal parenthesis
            const data = await DealRequest.Requestlist(ad_id);
            return res.json({
                success: true,
                data: data
            });
        } catch (err) {
            console.log("error occurred in controller:", err);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                data: []
            });
        }
    }
};

module.exports = deal_controller;