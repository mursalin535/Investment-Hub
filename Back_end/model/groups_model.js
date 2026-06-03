const db = require('../DataBase/Database')

class Groups_model {

    // ============================================
    //              GET ALL GROUPS
    // ============================================
    get() {
        return db.execute(`
            SELECT * FROM investment_groups
        `).then(([rows]) => {
            return rows;
        }).catch((err) => {
            console.log("Error fetching groups:", err);
        });
    }


    // ============================================
    //              GET ONE GROUP
    // ============================================
    getById(id) {
        return db.execute(`
            SELECT * FROM investment_groups
            WHERE id = ?
        `, [id]).then(([rows]) => {
            return rows[0];
        }).catch((err) => {
            console.log("Error occured in model:", err);
        });
    }

    getByAdminId(id) {
        return db.execute(`
            SELECT * FROM investment_groups
            WHERE admin_id = ?
        `, [id]).then(([rows]) => {
            return rows;  // ✅ Return full array for proper length checking
        }).catch((err) => {
            console.log("Error in model:", err);
            return [];
        });
    }

    // ============================================
    //         GET GROUPS BY MEMBER ID
    // ============================================
    getByMemberId(id) {
        return db.execute(`
            SELECT ig.* FROM investment_groups ig
            INNER JOIN investors i ON ig.id = i.grp_id
            WHERE i.id = ?
        `, [id]).then(([rows]) => {
            return rows;  // ✅ Return array of groups user is member of
        }).catch((err) => {
            console.log("Error fetching member groups:", err);
            return [];
        });
    }

    // ============================================
    //         GET ALL MEMBERS IN A GROUP
    // ============================================
    getGroupMembers(groupId) {
        return db.execute(`
            SELECT id, name, email, phone, photo_url,
                   total_investment, total_profit
            FROM investors
            WHERE grp_id = ?
            ORDER BY name ASC
        `, [groupId]).then(([rows]) => {
            return rows || [];
        }).catch((err) => {
            console.log("Error fetching group members:", err);
            return [];
        });
    }

    // ============================================
    //         GET GROUP ADMIN INFO
    // ============================================
    getGroupAdmin(groupId) {
        return db.execute(`
            SELECT id, name, email, phone, photo_url
            FROM investors
            WHERE id = (
                SELECT admin_id FROM investment_groups WHERE id = ?
            )
        `, [groupId]).then(([rows]) => {
            return rows ? rows[0] : null;
        }).catch((err) => {
            console.log("Error fetching group admin:", err);
            return null;
        });
    }


    // ============================================
    //              SAVE / CREATE GROUP
    // ============================================
    save({ name, total_investment, total_profit, photo_url, admin_id }) {
        return db.execute(`
            INSERT INTO investment_groups
                (name, total_investment, total_profit, photo_url, admin_id)
            VALUES
                (?, ?, ?, ?, ?)
        `, [name, total_investment || 0, total_profit || 0, photo_url || null, admin_id]
        ).then(([result]) => {
            return result.insertId;
        }).catch((err) => {
            console.log("Error saving group:", err);
        });
    }


    // ============================================
    //              CHANGE GROUP NAME
    // ============================================
    changeName(id, newName) {
        return db.execute(`
            UPDATE investment_groups
            SET name = ?
            WHERE id = ?
        `, [newName, id]
        ).then(([result]) => {
            return result.affectedRows;
        }).catch((err) => {
            console.log("Error changing group name:", err);
        });
    }


    // ============================================
    //              CHANGE GROUP PHOTO
    // ============================================
    changePhoto(id, photo_url) {
        return db.execute(`
            UPDATE investment_groups
            SET photo_url = ?
            WHERE id = ?
        `, [photo_url, id]
        ).then(([result]) => {
            return result.affectedRows;
        }).catch((err) => {
            console.log("Error changing group photo:", err);
        });
    }


    // ============================================
    //              SEE MEMBERS
    // ============================================
    getMembers(group_id) {
        return db.execute(`
            SELECT id, name, phone, email, photo_url,
                   total_investment, total_profit
            FROM investors
            WHERE grp_id = ?
        `, [group_id]
        ).then(([rows]) => {
            return rows;
        }).catch((err) => {
            console.log("Error fetching members:", err);
        });
    }


    // ============================================
    //              ADD MEMBER
    // ============================================
    addMember(group_id, investor_id) {
        return db.execute(`
            UPDATE investors
            SET grp_id = ?
            WHERE id = ?
        `, [group_id, investor_id]
        ).then(([result]) => {
            return result.affectedRows;
        }).catch((err) => {
            console.log("Error adding member:", err);
        });
    }


    // ============================================
    //              DROP MEMBER
    // ============================================
    dropMember(investor_id) {
        return db.execute(`
            UPDATE investors
            SET grp_id = NULL
            WHERE id = ?
        `, [investor_id]
        ).then(([result]) => {
            return result.affectedRows;
        }).catch((err) => {
            console.log("Error dropping member:", err);
        });
    }


    // ============================================
    //              DELETE GROUP
    // ============================================
    delete(id) {
        return db.execute(`
            UPDATE investors
            SET grp_id = NULL
            WHERE grp_id = ?
        `, [id]
        ).then(() => {
            return db.execute(`
                DELETE FROM investment_groups
                WHERE id = ?
            `, [id]);
        }).then(([result]) => {
            return result.affectedRows;
        }).catch((err) => {
            console.log("Error deleting group:", err);
        });
    }

}

module.exports = new Groups_model(); // ✅ fix: needs `new` to instantiate the class