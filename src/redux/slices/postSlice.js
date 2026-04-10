import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from '@reduxjs/toolkit'
import { selectAllGroupPosts } from './groupSlice'
import { selectAllCompanyPosts } from './companySlice'

const initialState = {
    userPosts: [
        {
            id: 9001,
            author: "Sabbir Ahmed",
            avatar: "/user_sabbir.webp",
            role: "Individual Investor",
            type: "complaint",
            content: "Important warning: I have been trying to get updates from a group I invested in for 3 weeks with no response. The platform team has been notified and legal action is being reviewed. Always use documented contracts!",
            time: "4 hours ago",
            likes: 203,
            comments: 89,
            image: null,
            tags: ["warning", "transparency"]
        },
        {
            id: 9002,
            author: "Fahmida Khanam",
            avatar: "/user_fahmida.webp",
            role: "Individual Investor",
            type: "question",
            content: "Question for the community: For someone starting with ৳15,000, is it better to join an existing group or start a new one? Looking for honest answers.",
            time: "7 hours ago",
            likes: 87,
            comments: 64,
            image: null,
            tags: ["question", "beginner"]
        },
        {
            id: 9003,
            author: "Mehedi Hassan",
            avatar: "/user_mehedi.webp",
            role: "Business Owner",
            type: "revenue",
            content: "Sharing our monthly P&L publicly for full transparency to our investors. Revenue: ৳8.4L. Expenses: ৳5.1L. Net Profit: ৳3.3L. Distribution to investors this Friday.",
            time: "10 hours ago",
            likes: 134,
            comments: 41,
            image: "/post_pl_report.webp",
            tags: ["transparency", "profit"]
        },
        {
            id: 9004,
            author: "Shakila Parvin",
            avatar: "/user_shakila.webp",
            role: "Group Investor",
            type: "question",
            content: "Looking for recommendations — which sectors are performing best for group investments right now? Our group is planning our next round.",
            time: "12 hours ago",
            likes: 55,
            comments: 47,
            image: null,
            tags: ["question", "strategy"]
        },
        {
            id: 9005,
            author: "Rezaul Karim",
            avatar: "/user_rezaul.webp",
            role: "Individual Investor",
            type: "profit",
            content: "Just received my first profit distribution — ৳4,200 return on ৳25,000 in just 4 months. That is a 16.8% annualised return. This platform is genuinely delivering. Highly recommend to anyone on the fence.",
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
            const index = state.likedPosts.indexOf(id)
            if (index === -1) {
                state.likedPosts.push(id)
                const post = state.userPosts.find(p => p.id === id)
                if (post) post.likes += 1
            } else {
                state.likedPosts.splice(index, 1)
                const post = state.userPosts.find(p => p.id === id)
                if (post) post.likes -= 1
            }
        },
        toggleSavePost: (state, action) => {
            const id = action.payload
            const index = state.savedPosts.indexOf(id)
            if (index === -1) {
                state.savedPosts.push(id)
            } else {
                state.savedPosts.splice(index, 1)
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

// Basic selectors
export const selectUserPosts = (state) => state.posts.userPosts
export const selectActiveFilter = (state) => state.posts.activeFilter
export const selectSearchQuery = (state) => state.posts.searchQuery
export const selectLikedPosts = (state) => state.posts.likedPosts
export const selectSavedPosts = (state) => state.posts.savedPosts

// Memoized selector — aggregates ALL posts from all slices
export const selectAllPosts = createSelector(
    [selectAllGroupPosts, selectAllCompanyPosts, selectUserPosts],
    (groupPosts, companyPosts, userPosts) => {
        const gp = Array.isArray(groupPosts) ? groupPosts : []
        const cp = Array.isArray(companyPosts) ? companyPosts : []
        const up = Array.isArray(userPosts) ? userPosts : []
        
        return [...gp, ...cp, ...up].sort((a, b) => (b.id || 0) - (a.id || 0))
    }
)

// Memoized selector — filtered + searched posts
export const selectFilteredPosts = createSelector(
    [selectAllPosts, selectActiveFilter, selectSearchQuery],
    (allPosts, filter, query) => {
        const posts = allPosts || []
        const activeFilter = filter || 'all'
        const searchQuery = query || ''

        return posts.filter(p => {
            const matchFilter = activeFilter === 'all' || p.type === activeFilter
            const matchSearch = searchQuery === '' ||
                (p.content && p.content.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (p.author && p.author.toLowerCase().includes(searchQuery.toLowerCase()))
            return matchFilter && matchSearch
        })
    }
)

export default postSlice.reducer
