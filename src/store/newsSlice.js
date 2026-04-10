import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    newsItems: [
        {
            id: 1,
            title: "Bangladesh Investment Climate Improves — Foreign Capital Up 28%",
            source: "Financial Express BD",
            category: "Economy",
            time: "2 hours ago",
            summary: "Bangladesh's investment climate has seen significant improvement with foreign direct investment rising 28% compared to last year according to BIDA.",
            image: "/news_economy.webp",
            trending: true,
            readTime: "4 min read"
        },
        {
            id: 2,
            title: "Group Investment Model Gains Popularity Among Young Professionals",
            source: "Daily Star Business",
            category: "Investment Trends",
            time: "5 hours ago",
            summary: "A growing number of young professionals in Dhaka and Chittagong are turning to group investment platforms to access opportunities previously limited to high-net-worth individuals.",
            image: "/news_group_invest.webp",
            trending: true,
            readTime: "3 min read"
        },
        {
            id: 3,
            title: "Agro Sector Returns Outperform Market Average in Q3",
            source: "Business Standard BD",
            category: "Agriculture",
            time: "1 day ago",
            summary: "Agricultural investments have outperformed the broader market by 6.2 percentage points in Q3, driven by export growth and new cold-chain infrastructure.",
            image: "/news_agro.webp",
            trending: false,
            readTime: "5 min read"
        },
        {
            id: 4,
            title: "New Legal Framework for Fintech Investment Contracts Announced",
            source: "Prothom Alo Business",
            category: "Policy",
            time: "1 day ago",
            summary: "The Bangladesh government announced a new legal framework specifically designed to protect investors in digital and fintech investment agreements.",
            image: "/news_legal.webp",
            trending: true,
            readTime: "6 min read"
        },
        {
            id: 5,
            title: "Real Estate Investment Trusts — A New Avenue for Small Investors",
            source: "Dhaka Tribune Finance",
            category: "Real Estate",
            time: "2 days ago",
            summary: "REITs are opening up Bangladesh's real estate sector to retail investors with minimum entry points as low as ৳5,000 across several new platforms.",
            image: "/news_realestate.webp",
            trending: false,
            readTime: "4 min read"
        },
        {
            id: 6,
            title: "Tech Startups in Bangladesh Attract Record ৳180Cr in 2024",
            source: "Tech Business Asia",
            category: "Technology",
            time: "3 days ago",
            summary: "Bangladesh's technology startup ecosystem has attracted record investment in 2024 with fintech and healthtech leading the way.",
            image: "/news_tech.webp",
            trending: false,
            readTime: "5 min read"
        }
    ],
    activeCategory: 'All',
}

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        setActiveCategory: (state, action) => {
            state.activeCategory = action.payload
        },
    }
})

export const { setActiveCategory } = newsSlice.actions

// Selectors
export const selectAllNews = (state) => state.news.newsItems
export const selectTrendingNews = (state) =>
    state.news.newsItems.filter(n => n.trending)
export const selectActiveCategory = (state) => state.news.activeCategory
export const selectFilteredNews = (state) => {
    const { newsItems, activeCategory } = state.news
    return activeCategory === 'All'
        ? newsItems
        : newsItems.filter(n => n.category === activeCategory)
}

export default newsSlice.reducer