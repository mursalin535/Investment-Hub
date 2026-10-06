// ✅ Get all groups
export async function group_server() {
    try {
        const res = await fetch('http://localhost:5009/groups', { credentials: 'include' });
        const data = await res.json();  // ✅ Added await
        return data;
    } catch (err) {
        console.log("Error fetching groups:", err);
        return [];
    }
}

// ✅ Get user's own groups
export async function group_server_your_group(userId) {
    try {
        const res = await fetch(`http://localhost:5009/groups/yourgroup/${userId}`, { credentials: 'include' });
        const data = await res.json();  // ✅ Added await
        return data;
    } catch (err) {
        console.log("Error fetching your groups:", err);
        return [];
    }
}

// ✅ Create a new group
export async function group_server_create(name, photoFile, adminId) {
    try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('adminId', adminId);
        if (photoFile) {
            formData.append('photo', photoFile);
        }

        const res = await fetch(`http://localhost:5009/groups/create`, {
            method: 'POST',
            body: formData,
            credentials: 'include',
            // Note: Don't set Content-Type header, browser will set it automatically with boundary
        });
        const data = await res.json();
        return data;
    } catch (err) {
        console.log("Error creating group:", err);
        return { success: false, message: err.message };
    }
}