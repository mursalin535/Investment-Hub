import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    groups: [
        {
            id: 1,
            name: "Dhaka Tech Investors",
            category: "Technology",
            members: 24,
            totalInvested: "৳45L",
            returns: "+18.2%",
            avatar: "/grp_tech.webp",
            cover: "/grp_tech_cover.webp",
            description: "A group of technology-focused investors pooling capital into Bangladesh's growing tech sector.",
            posts: [
                {
                    id: 101,
                    author: "Rafiul Hasan",
                    avatar: "/user_rafiul.webp",
                    role: "Group Admin",
                    groupId: 1,
                    groupName: "Dhaka Tech Investors",
                    type: "profit",
                    content: "Great news! Our group earned ৳1.2L profit this month from our SoftTech investment. Returns are at 22% — ahead of schedule. Proud of this team!",
                    time: "2 hours ago",
                    likes: 34,
                    comments: 12,
                    image: "/post_profit_chart.webp",
                    tags: ["profit", "technology"]
                },
                {
                    id: 102,
                    author: "Rafiul Hasan",
                    avatar: "/user_rafiul.webp",
                    role: "Group Admin",
                    groupId: 1,
                    groupName: "Dhaka Tech Investors",
                    type: "recruitment",
                    content: "We are looking for 2 more members to join our next investment round. Minimum contribution: ৳10,000. We invest in verified tech startups with full legal contracts. DM or comment below.",
                    time: "1 day ago",
                    likes: 56,
                    comments: 28,
                    image: null,
                    tags: ["join", "recruitment"]
                }
            ]
        },
        {
            id: 2,
            name: "Agro Growth Fund",
            category: "Agriculture",
            members: 18,
            totalInvested: "৳28L",
            returns: "+12.5%",
            avatar: "/grp_agro.webp",
            cover: "/grp_agro_cover.webp",
            description: "Investing in Bangladesh's agricultural sector for sustainable and profitable returns.",
            posts: [
                {
                    id: 201,
                    author: "Tariqul Islam",
                    avatar: "/user_tariqul.webp",
                    role: "Group Admin",
                    groupId: 2,
                    groupName: "Agro Growth Fund",
                    type: "contract",
                    content: "Big announcement! We just signed a contract with GreenHarvest Ltd for a ৳8L investment deal. Legal documentation complete, monitoring starts tomorrow. This is what secured investing looks like!",
                    time: "5 hours ago",
                    likes: 42,
                    comments: 19,
                    image: "/post_contract.webp",
                    tags: ["contract", "agriculture"]
                },
                {
                    id: 202,
                    author: "Nadia Begum",
                    avatar: "/user_nadia.webp",
                    role: "Member",
                    groupId: 2,
                    groupName: "Agro Growth Fund",
                    type: "question",
                    content: "Has anyone looked into the new government agricultural subsidy policy? Could this affect our Q4 returns? Would love to hear thoughts before our next meeting.",
                    time: "2 days ago",
                    likes: 15,
                    comments: 22,
                    image: null,
                    tags: ["question", "policy"]
                }
            ]
        },
        {
            id: 3,
            name: "Real Estate Circle",
            category: "Real Estate",
            members: 32,
            totalInvested: "৳1.2Cr",
            returns: "+9.8%",
            avatar: "/grp_realestate.webp",
            cover: "/grp_realestate_cover.webp",
            description: "Group investment in verified real estate projects across major Bangladesh cities.",
            posts: [
                {
                    id: 301,
                    author: "Imran Chowdhury",
                    avatar: "/user_imran.webp",
                    role: "Group Admin",
                    groupId: 3,
                    groupName: "Real Estate Circle",
                    type: "profit",
                    content: "Our Mirpur residential project has completed Phase 1. Investors received their proportional returns — total distributed: ৳18L. All documented. On to Phase 2!",
                    time: "1 day ago",
                    likes: 88,
                    comments: 34,
                    image: "/post_realestate.webp",
                    tags: ["profit", "real estate"]
                }
            ]
        }
    ],
    selectedGroup: null,
}

const groupSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {
        selectGroup: (state, action) => {
            state.selectedGroup = state.groups.find(g => g.id === action.payload) || null
        },
        clearSelectedGroup: (state) => {
            state.selectedGroup = null
        },
        likeGroupPost: (state, action) => {
            const { postId } = action.payload
            state.groups.forEach(g => {
                const post = g.posts.find(p => p.id === postId)
                if (post) post.likes += 1
            })
        },
    }
})

export const { selectGroup, clearSelectedGroup, likeGroupPost } = groupSlice.actions

// Selectors
export const selectAllGroups = (state) => state.groups.groups
export const selectSelectedGroup = (state) => state.groups.selectedGroup
export const selectAllGroupPosts = (state) =>
    state.groups.groups.flatMap(g => g.posts)

export default groupSlice.reducer