const Groups_model = require('../model/groups_model')

const groups_controller = {
    
    getAll: (req, res) => {
        Groups_model.get().then((groups) => {
            res.json(groups);
        }).catch((err) => {
            res.status(500).json({ message: 'Error fetching groups', error: err });
        });
    },

    // ✅ FIXED
    getByAdminId: (req, res) => {
        const { id } = req.params;  // ✅ Destructure properly
        Groups_model.getByAdminId(id).then((group) => {
            res.status(200).json({
                success: true,
                data: group
            });
        }).catch((err) => {
            console.log("Error in controller:", err);
            res.status(404).json({
                success: false,
                data: []
            });
        });
    }
}

module.exports = groups_controller;