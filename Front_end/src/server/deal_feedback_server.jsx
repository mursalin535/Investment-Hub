const API = 'http://localhost:5009';

export async function submitFeedback(ad_id, feedback_text) {
    const res = await fetch(`${API}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ad_id, feedback_text })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
}

export async function getFeedback(deal_id) {
    const res = await fetch(`${API}/feedback/${deal_id}`, {
        credentials: 'include'
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
}

export async function getFeedbackByAd(ad_id) {
    const res = await fetch(`${API}/feedback/ad/${ad_id}`, {
        credentials: 'include'
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
}
