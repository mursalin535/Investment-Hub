import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import post_server from '../../server/post_server'

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (_, { rejectWithValue }) => {
        try {
            const res = await post_server.getPublicPosts()
            return res.success ? res.data : []
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

export const fetchGroupPosts = createAsyncThunk(
    'posts/fetchGroupPosts',
    async (groupId, { rejectWithValue }) => {
        try {
            const res = await post_server.getGroupPosts(groupId)
            return res.success ? res.data : []
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

export const createPost = createAsyncThunk(
    'posts/createPost',
    async (formData, { rejectWithValue }) => {
        try {
            const res = await post_server.createPost(formData)
            return res.success ? res.data : res
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

export const likePost = createAsyncThunk(
    'posts/likePost',
    async (postId, { rejectWithValue }) => {
        try {
            const res = await post_server.likePost(postId)
            return res.success ? res.data : res
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts:       [],
        groupPosts:  [],
        loading:     false,
        error:       null,
    },
    reducers: {
        clearGroupPosts: (state) => {
            state.groupPosts = []
        }
    },
    extraReducers: (builder) => {

        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true
                state.error   = null
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false
                state.posts   = action.payload
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false
                state.error   = action.payload
            })

        builder
            .addCase(fetchGroupPosts.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchGroupPosts.fulfilled, (state, action) => {
                state.loading    = false
                state.groupPosts = action.payload
            })
            .addCase(fetchGroupPosts.rejected, (state, action) => {
                state.loading = false
                state.error   = action.payload
            })

        builder
            .addCase(createPost.pending, (state) => {
                state.loading = true
                state.error   = null
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.loading = false
                const newPost = action.payload
                if (newPost.visibility === 'public') {
                    state.posts.unshift(newPost)
                } else {
                    state.groupPosts.unshift(newPost)
                }
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false
                state.error   = action.payload
            })

        builder
            .addCase(likePost.fulfilled, (state, action) => {
                const updated = action.payload
                let index = state.posts.findIndex(p => p.id === updated.id)
                if (index !== -1) state.posts[index] = updated
                index = state.groupPosts.findIndex(p => p.id === updated.id)
                if (index !== -1) state.groupPosts[index] = updated
            })
    }
})

export const { clearGroupPosts } = postSlice.actions
export const selectPosts      = (state) => state.posts.posts
export const selectGroupPosts = (state) => state.posts.groupPosts
export const selectLoading    = (state) => state.posts.loading
export const selectError      = (state) => state.posts.error

export default postSlice.reducer
