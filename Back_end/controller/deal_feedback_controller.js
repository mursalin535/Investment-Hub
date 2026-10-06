const DealFeedback = require('../model/deal_feedback_model');

exports.submitFeedback = async (req, res) => {
    try {
        const { ad_id, feedback_text } = req.body;
        if (!ad_id || !feedback_text) {
            return res.status(400).json({ success: false, message: 'ad_id and feedback_text are required' });
        }
        const feedback = await DealFeedback.submitFeedback(ad_id, feedback_text);
        res.json({ success: true, data: feedback });
    } catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
};

exports.getFeedback = async (req, res) => {
    try {
        const { deal_id } = req.params;
        const feedback = await DealFeedback.getFeedback(deal_id);
        res.json({ success: true, data: feedback });
    } catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
};

exports.getFeedbackByAd = async (req, res) => {
    try {
        const { ad_id } = req.params;
        const feedback = await DealFeedback.getFeedbackByAd(ad_id);
        res.json({ success: true, data: feedback });
    } catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
};
