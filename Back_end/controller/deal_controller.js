const DealRequest = require('../model/deal_request_model');

const deal_controller = {

    SendingReq: async (req, res) => {
        const { id, ad_id, role, investment_type, group_id } = req.body;
        try {
            let result;
            if (role === 'investor') {
                result = await DealRequest.RequestAsInvestor({ id, ad_id, investment_type, group_id });
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

    Requestlist: async (req, res) => {
        try {
            const { ad_id } = req.params;
            const { requests, adInfo } = await DealRequest.Requestlist(ad_id);
            return res.json({ success: true, data: requests, adInfo });
        } catch (err) {
            console.log('error occurred in controller:', err);
            return res.status(500).json({ success: false, message: 'Internal server error', data: [], adInfo: null });
        }
    },

    UpdateStatus: async (req, res) => {
        try {
            const { request_id, status } = req.body;
            const result = await DealRequest.UpdateStatus({ request_id, status });
            return res.json({ success: true, data: result });
        } catch (err) {
            console.log('error occurred in controller:', err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },

    AcceptRequest: async (req, res) => {
        try {
            const { request_id, ad_id } = req.body;
            const result = await DealRequest.AcceptAndRejectRest({ request_id, ad_id });
            return res.json({ success: true, data: result });
        } catch (err) {
            console.log('error occurred in controller:', err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },
};

module.exports = deal_controller;