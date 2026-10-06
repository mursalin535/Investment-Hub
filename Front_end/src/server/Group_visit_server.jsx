const BASE_URL = 'http://localhost:5009';

export async function getGroupDetails(groupId, viewerId) {
    try {
        const url = viewerId
            ? `${BASE_URL}/groups/visit/${groupId}?viewer_id=${viewerId}`
            : `${BASE_URL}/groups/visit/${groupId}`;
        const res = await fetch(url, { credentials: 'include' });
        return await res.json();
    } catch (err) {
        console.log('Error fetching group details:', err);
        return { success: false };
    }
}

export async function sendJoinRequest(groupId, investorId) {
    try {
        const res = await fetch(`${BASE_URL}/groups/join`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ group_id: groupId, investor_id: investorId }),
            credentials: 'include',
        });
        return await res.json();
    } catch (err) {
        console.log('Error sending join request:', err);
        return { success: false };
    }
}

export async function acceptJoinRequest(requestId) {
    try {
        const res = await fetch(`${BASE_URL}/groups/join/accept`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ request_id: requestId }),
            credentials: 'include',
        });
        return await res.json();
    } catch (err) {
        console.log('Error accepting join request:', err);
        return { success: false };
    }
}

export async function rejectJoinRequest(requestId) {
    try {
        const res = await fetch(`${BASE_URL}/groups/join/reject`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ request_id: requestId }),
            credentials: 'include',
        });
        return await res.json();
    } catch (err) {
        console.log('Error rejecting join request:', err);
        return { success: false };
    }
}
