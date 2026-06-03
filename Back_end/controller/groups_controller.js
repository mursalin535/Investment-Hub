const Groups_model = require('../model/groups_model')

const groups_controller = {

    getAll: (req, res) => {
        Groups_model.get().then((groups) => {
            res.json(groups);
        }).catch((err) => {
            res.status(500).json({ message: 'Error fetching groups', error: err });
        });
    },

    getByAdminId: (req, res) => {
        const { id } = req.params;

        Groups_model.getByAdminId(id)
            .then(async (adminGroups) => {
                // If admin has groups, return them with members
                if (adminGroups && adminGroups.length > 0) {
                    const groupsWithMembers = await Promise.all(
                        adminGroups.map(async (group) => {
                            const members = await Groups_model.getGroupMembers(group.id);
                            return {
                                ...group,
                                members: members || [],
                                member_count: (members || []).length
                            };
                        })
                    );

                    return res.status(200).json({
                        success: true,
                        type: "admin",
                        data: groupsWithMembers
                    });
                }

                // If no admin groups, check if user is a member
                return Groups_model.getByMemberId(id)
                    .then(async (memberGroups) => {
                        if (memberGroups && memberGroups.length > 0) {
                            const groupsWithDetails = await Promise.all(
                                memberGroups.map(async (group) => {
                                    const [members, admin] = await Promise.all([
                                        Groups_model.getGroupMembers(group.id),
                                        Groups_model.getGroupAdmin(group.id)
                                    ]);

                                    return {
                                        ...group,
                                        admin: admin || null,
                                        members: members || [],
                                        member_count: (members || []).length
                                    };
                                })
                            );

                            return res.status(200).json({
                                success: true,
                                type: "member",
                                data: groupsWithDetails
                            });
                        }

                        // No groups found as admin or member
                        return res.status(404).json({
                            success: false,
                            type: "none",
                            data: []
                        });
                    })
                    .catch((err) => {
                        console.log("Error fetching member groups:", err);
                        res.status(404).json({ success: false, data: [] });
                    });
            })
            .catch((err) => {
                console.log("Error in controller:", err);
                res.status(500).json({ success: false, data: [] });
            });
    },

    create: (req, res) => {
        const { name } = req.body;
        const adminId = req.query.adminId || req.body.adminId;
        const photoUrl = req.file ? `/uploads/${req.file.filename}` : null;

        if (!name || !adminId) {
            return res.status(400).json({
                success: false,
                message: 'Group name and admin ID are required'
            });
        }

        Groups_model.save({
            name,
            photo_url: photoUrl,
            total_investment: 0,
            total_profit: 0,
            admin_id: adminId
        }).then((groupId) => {
            res.status(201).json({
                success: true,
                message: 'Group created successfully',
                groupId: groupId
            });
        }).catch((err) => {
            console.log("Error creating group:", err);
            res.status(500).json({
                success: false,
                message: 'Error creating group',
                error: err.message
            });
        });
    }
}

module.exports = groups_controller;