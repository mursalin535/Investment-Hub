const BASE_URL = 'http://localhost:5009'

const post_server = {

    getAllPosts: async () => {
        const res = await fetch(`${BASE_URL}/posts`)
        if (!res.ok) throw new Error('Failed to fetch posts')
        return res.json()
    },

    createPost: async (formData) => {
        const res = await fetch(`${BASE_URL}/posts`, {
            method: 'POST',
            body: formData,
        })
        if (!res.ok) throw new Error('Failed to create post')
        return res.json()
    },

    likePost: async (postId) => {
        const res = await fetch(`${BASE_URL}/posts/${postId}/like`, {
            method: 'PATCH',
        })
        if (!res.ok) throw new Error('Failed to like post')
        return res.json()
    },
}

export default post_server