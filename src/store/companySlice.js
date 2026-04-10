import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    companies: [
        {
            id: 1,
            name: "GreenHarvest Ltd",
            category: "Agriculture",
            founded: "2018",
            revenue: "৳2.4Cr",
            investors: 12,
            avatar: "/co_greenhouse.webp",
            cover: "/co_greenhouse_cover.webp",
            description: "A leading agricultural processing company focusing on sustainable food production and export.",
            posts: [
                {
                    id: 1001,
                    author: "GreenHarvest Ltd",
                    avatar: "/co_greenhouse.webp",
                    role: "Official Account",
                    companyId: 1,
                    companyName: "GreenHarvest Ltd",
                    type: "funding",
                    content: "We are seeking investors for our new cold storage facility. Total requirement: ৳25L. Expected ROI: 20% over 18 months. Full legal documentation provided. Contact us through the platform.",
                    time: "3 hours ago",
                    likes: 67,
                    comments: 31,
                    image: "/post_funding_seek.webp",
                    tags: ["funding", "opportunity"]
                },
                {
                    id: 1002,
                    author: "GreenHarvest Ltd",
                    avatar: "/co_greenhouse.webp",
                    role: "Official Account",
                    companyId: 1,
                    companyName: "GreenHarvest Ltd",
                    type: "revenue",
                    content: "Q3 Report: Revenue up 34% YoY. Our export division grew 58%. Full financial report available on our profile.",
                    time: "4 days ago",
                    likes: 120,
                    comments: 45,
                    image: "/post_revenue_chart.webp",
                    tags: ["revenue", "quarterly"]
                }
            ]
        },
        {
            id: 2,
            name: "SoftTech Solutions",
            category: "Technology",
            founded: "2020",
            revenue: "৳1.1Cr",
            investors: 8,
            avatar: "/co_softtech.webp",
            cover: "/co_softtech_cover.webp",
            description: "A fast-growing software company building fintech and e-commerce solutions for the Bangladeshi market.",
            posts: [
                {
                    id: 2001,
                    author: "SoftTech Solutions",
                    avatar: "/co_softtech.webp",
                    role: "Official Account",
                    companyId: 2,
                    companyName: "SoftTech Solutions",
                    type: "launch",
                    content: "New Product Launch: PayBridge — our B2B payment gateway is now live! This directly increases our revenue potential by 40%. Investor briefing scheduled for next week.",
                    time: "6 hours ago",
                    likes: 145,
                    comments: 67,
                    image: "/post_product_launch.webp",
                    tags: ["launch", "product"]
                },
                {
                    id: 2002,
                    author: "SoftTech Solutions",
                    avatar: "/co_softtech.webp",
                    role: "Official Account",
                    companyId: 2,
                    companyName: "SoftTech Solutions",
                    type: "funding",
                    content: "We are opening a Series A funding round. Looking for strategic investors. Minimum: ৳50,000. All investments legally secured through Investment Hub.",
                    time: "2 days ago",
                    likes: 98,
                    comments: 52,
                    image: null,
                    tags: ["funding", "series-a"]
                }
            ]
        },
        {
            id: 3,
            name: "BuildRight Construction",
            category: "Real Estate",
            founded: "2015",
            revenue: "৳5.8Cr",
            investors: 22,
            avatar: "/co_buildright.webp",
            cover: "/co_buildright_cover.webp",
            description: "One of Dhaka's most trusted construction firms specializing in residential and commercial real estate.",
            posts: [
                {
                    id: 3001,
                    author: "BuildRight Construction",
                    avatar: "/co_buildright.webp",
                    role: "Official Account",
                    companyId: 3,
                    companyName: "BuildRight Construction",
                    type: "launch",
                    content: "Announcing our newest project: Uttara Horizon — a 12-floor mixed-use complex. Phase 1 investment slots are now open. Expected completion: Q2 2026. Join early for best returns.",
                    time: "8 hours ago",
                    likes: 178,
                    comments: 84,
                    image: "/post_construction.webp",
                    tags: ["real estate", "new project"]
                }
            ]
        }
    ],
    selectedCompany: null,
}

const companySlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {
        selectCompany: (state, action) => {
            state.selectedCompany = state.companies.find(c => c.id === action.payload) || null
        },
        clearSelectedCompany: (state) => {
            state.selectedCompany = null
        },
        likeCompanyPost: (state, action) => {
            const { postId } = action.payload
            state.companies.forEach(c => {
                const post = c.posts.find(p => p.id === postId)
                if (post) post.likes += 1
            })
        },
    }
})

export const { selectCompany, clearSelectedCompany, likeCompanyPost } = companySlice.actions

// Selectors
export const selectAllCompanies = (state) => state.companies.companies
export const selectSelectedCompany = (state) => state.companies.selectedCompany
export const selectAllCompanyPosts = (state) =>
    state.companies.companies.flatMap(c => c.posts)

export default companySlice.reducer