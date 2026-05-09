import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    investmentAds: [
        {
            id: 1,
            name: "Anisur Rahman",
            email: "anisur.rahman@greenharvest.com",
            phone: "+880 1711-223344",
            nid: "1234567890",
            businessName: "GreenHarvest Ltd",
            lastYearRevenue: "৳2.4Cr",
            lastMonthRevenue: "৳22L",
            totalSales: "15,000+ Units",
            askingAmount: "৳25,00,000",
            description: "We are expanding our sustainable organic farming operations to northern districts. Seeking investment for a high-efficiency automated irrigation system and cold storage facility to reduce post-harvest losses. Investors will receive monthly profit share and equity options.",
            thumbnail: "/co_greenhouse_cover.webp",
            status: "approved",
            createdAt: "2024-03-15T10:00:00Z"
        },
        {
            id: 2,
            name: "Farhana Akter",
            email: "farhana.akter@softtech.com",
            phone: "+880 1812-334455",
            nid: "0987654321",
            businessName: "SoftTech Solutions",
            lastYearRevenue: "৳1.1Cr",
            lastMonthRevenue: "৳12L",
            totalSales: "2,500+ Clients",
            askingAmount: "৳50,00,000",
            description: "SoftTech Solutions is developing a next-generation AI-driven fintech platform for small businesses in Bangladesh. This funding will be used to accelerate product development, hire top-tier engineering talent, and initiate market entry strategies for regional expansion.",
            thumbnail: "/co_softtech_cover.webp",
            status: "approved",
            createdAt: "2024-03-20T14:30:00Z"
        },
        {
            id: 3,
            name: "Mahidul Hasan",
            email: "mahidul.hasan@buildright.com",
            phone: "+880 1913-445566",
            nid: "1122334455",
            businessName: "BuildRight Construction",
            lastYearRevenue: "৳5.8Cr",
            lastMonthRevenue: "৳45L",
            totalSales: "12 Major Projects",
            askingAmount: "৳1.5Cr",
            description: "Announcing 'The Green Horizon' project in Uttara. This mixed-use building incorporates eco-friendly design and smart-home technology. We are opening pre-construction investment slots for individual investors looking for high-yield real estate returns.",
            thumbnail: "/co_buildright_cover.webp",
            status: "approved",
            createdAt: "2024-04-01T09:15:00Z"
        },
        {
            id: 4,
            name: "Zubair Ahmed",
            email: "zubair.ahmed@agrotech.com",
            phone: "+880 1514-556677",
            nid: "9988776655",
            businessName: "AgroTech Innovators",
            lastYearRevenue: "৳85L",
            lastMonthRevenue: "৳8L",
            totalSales: "500+ Modern Farms",
            askingAmount: "৳35,00,000",
            description: "Our mission is to modernize Bangladeshi agriculture through affordable IoT-based soil and climate sensors. We've successfully piloted in three districts and are now scaling production to meet nationwide demand from cooperative farming groups.",
            thumbnail: "/grp_agro_cover.webp",
            status: "approved",
            createdAt: "2024-04-10T16:45:00Z"
        },
        {
            id: 5,
            name: "Tania Sultana",
            email: "tania.sultana@urbanliving.com",
            phone: "+880 1615-667788",
            nid: "4455667788",
            businessName: "Urban Living Real Estate",
            lastYearRevenue: "৳12Cr",
            lastMonthRevenue: "৳95L",
            totalSales: "45 Luxury Units",
            askingAmount: "৳3.5Cr",
            description: "Urban Living is redefining modern apartments in Gulshan. Our latest project features vertical gardens and smart energy management. We are seeking equity partners for this high-end residential development targeting premium clients.",
            thumbnail: "/grp_realestate_cover.webp",
            status: "approved",
            createdAt: "2024-04-12T11:00:00Z"
        },
        {
            id: 6,
            name: "Imran Khan",
            email: "imran.khan@futuretech.com",
            phone: "+880 1316-778899",
            nid: "2233445566",
            businessName: "FutureTech Robotics",
            lastYearRevenue: "৳45L",
            lastMonthRevenue: "৳5L",
            totalSales: "200+ Automated Kits",
            askingAmount: "৳15,00,000",
            description: "Building the future of automation in Bangladesh. We develop specialized robotics for small-scale industries to increase production efficiency by 3x. Seeking seed funding for our new assembly line.",
            thumbnail: "/grp_tech_cover.webp",
            status: "approved",
            createdAt: "2024-04-14T15:20:00Z"
        },
        {
            id: 7,
            name: "Nadia Islam",
            email: "nadia.islam@purewater.com",
            phone: "+880 1417-889900",
            nid: "7766554433",
            businessName: "PureFlow Solutions",
            lastYearRevenue: "৳1.8Cr",
            lastMonthRevenue: "৳16L",
            totalSales: "80,000+ Liters/Day",
            askingAmount: "৳40,00,000",
            description: "PureFlow provides sustainable water purification for rural communities. We use solar-powered filtration systems that are cost-effective and low maintenance. Expanding to 10 new upazilas this year.",
            thumbnail: "/about_platform.webp",
            status: "approved",
            createdAt: "2024-04-15T09:45:00Z"
        },
        {
            id: 8,
            name: "Rafiul Alam",
            email: "rafiul.alam@ecofuel.com",
            phone: "+880 1218-990011",
            nid: "3322114455",
            businessName: "EcoFuel Dynamics",
            lastYearRevenue: "৳2.1Cr",
            lastMonthRevenue: "৳19L",
            totalSales: "12,000 Units",
            askingAmount: "৳60,00,000",
            description: "Transforming agricultural waste into high-energy biofuels for industrial use. Our process is zero-waste and provides an alternative income stream for farmers. Investment will fund our second production plant.",
            thumbnail: "/about_hero.webp",
            status: "approved",
            createdAt: "2024-04-16T13:10:00Z"
        }
    ],
    isLoading: false,
    error: null
}

const investmentSlice = createSlice({
    name: 'investments',
    initialState,
    reducers: {
        addInvestmentAd: (state, action) => {
            state.investmentAds.unshift({
                ...action.payload,
                id: state.investmentAds.length + 1,
                status: 'pending',
                createdAt: new Date().toISOString()
            })
        },
        updateInvestmentStatus: (state, action) => {
            const { id, status } = action.payload
            const ad = state.investmentAds.find(ad => ad.id === id)
            if (ad) {
                ad.status = status
            }
        }
    }
})

export const { addInvestmentAd, updateInvestmentStatus } = investmentSlice.actions

// Selectors
export const selectAllInvestmentAds = (state) => state.investments.investmentAds
export const selectApprovedInvestmentAds = (state) => state.investments.investmentAds.filter(ad => ad.status === 'approved')

export default investmentSlice.reducer
