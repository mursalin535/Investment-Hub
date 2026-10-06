export default async function signUp(userData) {
    try {
        const res = await fetch('http://localhost:5009/api/signup', {
            method: 'POST',
            credentials: 'include',
            body: userData
        })
        return await res.json()
    } catch (err) {
        console.error('Signup error:', err)
        throw err
    }
}
