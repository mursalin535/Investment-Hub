const NID_API = 'http://localhost:5010';

export async function verifyNID(nid_number) {
    try {
        const res = await fetch(`${NID_API}/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nid_number })
        });
        return await res.json();
    } catch (err) {
        console.error('NID verify error:', err);
        return { success: false, message: 'NID server unreachable' };
    }
}
