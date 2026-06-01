// ✅ Get all groups
export async function group_server() {
    try {
        const res = await fetch('http://localhost:5009/groups');
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
        const res = await fetch(`http://localhost:5009/groups/yourgroup/${userId}`);
        const data = await res.json();  // ✅ Added await
        return data;
    } catch (err) {
        console.log("Error fetching your groups:", err);
        return [];
    }
}