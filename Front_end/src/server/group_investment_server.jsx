const API = import.meta.env.VITE_API_URL || 'http://localhost:5009';

export async function OptInOut(request_id, status, investor_id) {
    const res = await fetch(`${API}/opt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request_id, status, investor_id }),
        credentials: 'include',
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
}

export async function GetParticipants(request_id) {
    const res = await fetch(`${API}/participants/${request_id}`, { credentials: 'include' });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
}

export async function GetParticipantsPublic(request_id) {
    const res = await fetch(`${API}/participants/${request_id}`, { credentials: 'include' });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
}
