export async function Investment_add(formData) {
    try {
        const res  = await fetch('http://localhost:5009/investment/add', {
            method: 'POST',
            body: formData,
            credentials: 'include',
        });
        const data = await res.json();
        return data;
    } catch (err) {
        console.log("error occurred in server:", err);
        return { success: false };
    }
}

export async function getInvestmentAdds() {
    try {
        const res  = await fetch('http://localhost:5009/investment/get', { credentials: 'include' });
        const data = await res.json();
        return data;
    } catch (err) {
        console.log("error occurred in server:", err);
        return { success: false, data: [] };
    }
}