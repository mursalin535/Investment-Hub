const GroupVisitModel = require('../model/group_visit_model');

const group_visit_controller = {

    getGroupDetails: async (req, res) => {
        try {
            const { group_id } = req.params;
            const { viewer_id } = req.query;

            const group = await GroupVisitModel.getGroupById(group_id);
            if (!group) return res.status(404).json({ success: false, message: 'Group not found' });

            const [members, admin, posts] = await Promise.all([
                GroupVisitModel.getGroupMembers(group_id),
                GroupVisitModel.getGroupAdmin(group_id),
                GroupVisitModel.getGroupPosts(group_id),
            ]);

            let viewerStatus = null;
            if (viewer_id) {
                const groupId = await GroupVisitModel.getInvestorGroupStatus(viewer_id);
                if (groupId == group_id) viewerStatus = 'member';
                else if (groupId !== null) viewerStatus = 'other_group';
                else {
                    const reqs = await GroupVisitModel.getJoinRequests(group_id);
                    const myReq = reqs.find(r => r.investor_id == viewer_id);
                    viewerStatus = myReq ? myReq.status : 'none';
                }
            }

            const isAdmin = admin && viewer_id && admin.id == viewer_id;

            let pendingRequests = [];
            if (isAdmin) {
                pendingRequests = (await GroupVisitModel.getJoinRequests(group_id))
                    .filter(r => r.status === 'pending');
            }

            return res.json({
                success: true,
                data: {
                    group,
                    members,
                    admin,
                    posts,
                    viewerStatus,
                    isAdmin,
                    pendingRequests,
                }
            });
        } catch (err) {
            console.log('Error in getGroupDetails:', err);
            return res.status(500).json({ success: false, message: err.message });
        }
    },

    sendJoinRequest: async (req, res) => {
        try {
            const { group_id, investor_id } = req.body;
            const result = await GroupVisitModel.sendJoinRequest(group_id, investor_id);
            return res.json({ success: true, data: result });
        } catch (err) {
            console.log('Error in sendJoinRequest:', err);
            return res.status(500).json({ success: false, message: err.message });
        }
    },

    acceptJoinRequest: async (req, res) => {
        try {
            const { request_id } = req.body;
            const result = await GroupVisitModel.acceptJoinRequest(request_id);
            return res.json({ success: true, data: result });
        } catch (err) {
            console.log('Error in acceptJoinRequest:', err);
            return res.status(500).json({ success: false, message: err.message });
        }
    },

    rejectJoinRequest: async (req, res) => {
        try {
            const { request_id } = req.body;
            const result = await GroupVisitModel.rejectJoinRequest(request_id);
            return res.json({ success: true, data: result });
        } catch (err) {
            console.log('Error in rejectJoinRequest:', err);
            return res.status(500).json({ success: false, message: err.message });
        }
    },
};

module.exports = group_visit_controller;
