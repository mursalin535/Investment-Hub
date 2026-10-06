const GroupInvestment = require('../model/group_investment_model');

exports.OptInOut = async (req, res) => {
    try {
        const { request_id, status, investor_id } = req.body;
        const id = investor_id;
        if (!id) return res.status(401).json({ success: false, message: 'Unauthorized' });
        if (!request_id || !['in', 'out'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid data' });
        }
        const participants = await GroupInvestment.OptInOut({ request_id, investor_id: id, status });
        res.json({ success: true, data: participants });
    } catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
};

exports.GetParticipants = async (req, res) => {
    try {
        const { request_id } = req.params;
        const participants = await GroupInvestment.GetParticipants(request_id);
        res.json({ success: true, data: participants });
    } catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
};
