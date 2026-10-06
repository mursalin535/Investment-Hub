const API = 'http://localhost:5009';

export async function fetchMe() {
    try {
        const res = await fetch(`${API}/api/me`, {
            credentials: 'include'
        });
        const data = await res.json();
        return data;
    } catch (err) {
        return { success: false };
    }
}

export async function logout() {
    try {
        const res = await fetch(`${API}/api/logout`, {
            method: 'POST',
            credentials: 'include'
        });
        return await res.json();
    } catch (err) {
        console.error('Logout error:', err);
        return { success: false };
    }
}
