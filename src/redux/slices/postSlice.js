import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import post_server from '../../server/post_server'

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (_, { rejectWithValue }) => {
        try {
            return await post_server.getAllPosts()
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

export const createPost = createAsyncThunk(
    'posts/createPost',
    async (formData, { rejectWithValue }) => {
        try {
            return await post_server.createPost(formData)
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

export const likePost = createAsyncThunk(
    'posts/likePost',
    async (postId, { rejectWithValue }) => {
        try {
            return await post_server.likePost(postId)
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts:   [],
        loading: false,
        error:   null,
    },
    reducers: {},
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
            .addCase(createPost.pending, (state) => {
                state.loading = true
                state.error   = null
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.loading = false
                state.posts.unshift(action.payload)
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false
                state.error   = action.payload
            })

        builder
            .addCase(likePost.fulfilled, (state, action) => {
                const updated = action.payload
                const index   = state.posts.findIndex(p => p.id === updated.id)
                if (index !== -1) state.posts[index] = updated
            })
    }
})

export const selectPosts   = (state) => state.posts.posts
export const selectLoading = (state) => state.posts.loading
export const selectError   = (state) => state.posts.error

export default postSlice.reducer