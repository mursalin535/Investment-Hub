export default async function Login_server(userData) {
    try {
        const resp = await fetch('http://localhost:5009/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: userData
        })
        const data = await resp.json()
        return data
    } catch (error) {
        console.error('Error logging in:', error)
        throw error
    }
}
