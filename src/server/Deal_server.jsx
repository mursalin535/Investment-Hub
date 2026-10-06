export async function SendingReq(data) {
    try {
        const res = await fetch('http://localhost:5009/deal/request/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include',
        });
        return await res.json();
    } catch (err) {
        console.log('error occured in server:', err);
    }
}

export async function GetReqStatus(id, role) {
    try {
        const res = await fetch(`http://localhost:5009/reqstat/${id}/${role}`, { credentials: 'include' });
        return await res.json();
    } catch (err) {
        console.log('error occured in server:', err);
        return { success: false, data: [] };
    }
}

export async function RequestInfo(ad_id) {
    try {
        const res = await fetch(`http://localhost:5009/requestlist/${ad_id}`, { credentials: 'include' });
        return await res.json();
    } catch (err) {
        console.log('error occured in server:', err);
    }
}

export async function UpdateRequestStatus(request_id, status) {
    try {
        const res = await fetch('http://localhost:5009/deal/request/status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ request_id, status }),
            credentials: 'include',
        });
        return await res.json();
    } catch (err) {
        console.log('error occured in server:', err);
    }
}

export async function AcceptRequest(request_id, ad_id) {
    try {
        const res = await fetch('http://localhost:5009/deal/request/accept', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ request_id, ad_id }),
            credentials: 'include',
        });
        return await res.json();
    } catch (err) {
        console.log('error occured in server:', err);
    }
}