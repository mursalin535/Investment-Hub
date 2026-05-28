export default async function signUp(userData) {       // lowercase — convention
    try {
        const res = await fetch('http://localhost:5009/api/signup', {
            method: 'POST',
            body: userData                             // FormData — no Content-Type needed
        })
        return await res.json()
    } catch (err) {
        console.error('Signup error:', err)
        throw err                                      // let the component handle it
    }
}