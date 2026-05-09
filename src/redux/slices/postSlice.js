import { createSlice, createSelector } from '@reduxjs/toolkit'
import { selectAllGroupPosts } from './groupSlice'
import { selectAllCompanyPosts } from './companySlice'

const initialState = {
    userPosts: [
        {
            id: 9001,
            authorId: "u12",
            author: "Shakila Perveen",
            avatar: "/user_shakila.webp",
            role: "Individual Investor",
            type: "complaint",
            content: "Important warning: I have been trying to get updates from a group I invested in for 3 weeks with no response. Legal action is being reviewed. Always use documented contracts!",
            time: "4 hours ago",
            likes: 203,
            comments: 89,
            image: null,
            tags: ["warning", "transparency"]
        },
        {
            id: 9002,
            authorId: "u8",
            author: "Fahmida Khatun",
            avatar: "/user_fahmida.webp",
            role: "Individual Investor",
            type: "question",
            content: "For someone starting with ৳15,000, is it better to join an existing group or start a new one? Looking for honest answers.",
            time: "7 hours ago",
            likes: 87,
            comments: 64,
            image: null,
            tags: ["question", "beginner"]
        },
        {
            id: 9003,
            authorId: "u1",
            author: "Mehedi Hasan",
            avatar: "/user_mehedi.webp",
            role: "Business Owner",
            type: "revenue",
            content: "Monthly P&L: Revenue ৳8.4L — Expenses ৳5.1L — Net Profit ৳3.3L. Distribution to investors this Friday.",
            time: "10 hours ago",
            likes: 134,
            comments: 41,
            image: "/post_pl_report.webp",
            tags: ["transparency", "profit"]
        },
        {
            id: 9004,
            authorId: "u3",
            author: "Farhana Akter",
            avatar: "/farhana_akter.webp",
            role: "Group Investor",
            type: "question",
            content: "Which sectors are performing best for group investments right now? Our group is planning our next round.",
            time: "12 hours ago",
            likes: 55,
            comments: 47,
            image: null,
            tags: ["question", "strategy"]
        },
        {
            id: 9005,
            authorId: "u4",
            author: "Mahidul Hasan",
            avatar: "/mahidul_hasan.webp",
            role: "Individual Investor",
            type: "profit",
            content: "First profit distribution received — ৳4,200 return on ৳25,000 in just 4 months. 16.8% annualised return. Highly recommend!",
            time: "1 day ago",
            likes: 312,
            comments: 95,
            image: null,
            tags: ["profit", "success"]
        }
    ],
    activeFilter: 'all',
    searchQuery: '',
    likedPosts: [],
    savedPosts: [],
}

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {

        setActiveFilter: (state, action) => {
            state.activeFilter = action.payload
        },

        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload
        },

        toggleLikePost: (state, action) => {
            const id = action.payload
            const post = state.userPosts.find(p => p.id === id)
            const alreadyLiked = state.likedPosts.includes(id)

            if (alreadyLiked) {
                state.likedPosts = state.likedPosts.filter(pid => pid !== id)
                if (post) post.likes -= 1
            } else {
                state.likedPosts.push(id)
                if (post) post.likes += 1
            }
        },

        toggleSavePost: (state, action) => {
            const id = action.payload
            const alreadySaved = state.savedPosts.includes(id)

            if (alreadySaved) {
                state.savedPosts = state.savedPosts.filter(pid => pid !== id)
            } else {
                state.savedPosts.push(id)
            }
        },
    }
})

export const {
    setActiveFilter,
    setSearchQuery,
    toggleLikePost,
    toggleSavePost,
} = postSlice.actions

// ─── Basic Selectors ─────────────────────────────────────────
export const selectUserPosts    = (state) => state.posts.userPosts
export const selectActiveFilter = (state) => state.posts.activeFilter
export const selectSearchQuery  = (state) => state.posts.searchQuery
export const selectLikedPosts   = (state) => state.posts.likedPosts
export const selectSavedPosts   = (state) => state.posts.savedPosts

// ─── All Posts (merged from all slices) ──────────────────────
export const selectAllPosts = createSelector(
    [selectAllGroupPosts, selectAllCompanyPosts, selectUserPosts],
    (groupPosts, companyPosts, userPosts) => [
        ...(Array.isArray(groupPosts)   ? groupPosts   : []),
        ...(Array.isArray(companyPosts) ? companyPosts : []),
        ...(Array.isArray(userPosts)    ? userPosts    : []),
    ].sort((a, b) => (b.id || 0) - (a.id || 0))
)

// ─── Filtered + Searched Posts ────────────────────────────────
export const selectFilteredPosts = createSelector(
    [selectAllPosts, selectActiveFilter, selectSearchQuery],
    (allPosts, filter, query) => allPosts.filter(post => {
        const matchFilter = filter === 'all' || post.type === filter
        const matchSearch = query === '' ||
            post.content?.toLowerCase().includes(query.toLowerCase()) ||
            post.author?.toLowerCase().includes(query.toLowerCase())
        return matchFilter && matchSearch
    })
)

// ─── Posts by a specific user ─────────────────────────────────
export const selectPostsByAuthorId = (authorId) => createSelector(
    [selectAllPosts],
    (allPosts) => allPosts.filter(post => post.authorId === authorId)
)

// ─── Get authorId from a single post ─────────────────────────
export const selectAuthorIdByPostId = (postId) => createSelector(
    [selectAllPosts],
    (allPosts) => allPosts.find(post => post.id === postId)?.authorId ?? null
)

export default postSlice.reducer