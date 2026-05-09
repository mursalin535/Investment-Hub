import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    owners: [
        {
            id: 'o1',
            name: "Anisur Rahman",
            email: "anisur.rahman@greenharvest.com",
            avatar: "/anisur_rahman.webp",
            companyId: 1,
            companyName: "GreenHarvest Ltd",
            position: "Founder & CEO",
            bio: "Agricultural scientist turned entrepreneur with 15 years of experience in sustainable farming.",
            verified: true,
            linkedin: "https://linkedin.com",
            successRate: "92%"
        },
        {
            id: 'o2',
            name: "Farhana Akter",
            email: "farhana.akter@softtech.com",
            avatar: "/farhana_akter.webp",
            companyId: 2,
            companyName: "SoftTech Solutions",
            position: "Chief Executive Officer",
            bio: "Former software architect at a global fintech firm, now dedicated to digitizing SMEs in Bangladesh.",
            verified: true,
            linkedin: "https://linkedin.com",
            successRate: "88%"
        },
        {
            id: 'o3',
            name: "Mahidul Hasan",
            email: "mahidul.hasan@buildright.com",
            avatar: "/mahidul_hasan.webp",
            companyId: 3,
            companyName: "BuildRight Construction",
            position: "Managing Director",
            bio: "Civil engineer with a passion for eco-friendly urban development and smart city infrastructure.",
            verified: true,
            linkedin: "https://linkedin.com",
            successRate: "95%"
        },
        {
            id: 'o4',
            name: "Zubair Ahmed",
            email: "zubair.ahmed@agrotech.com",
            avatar: "/zubair_ahmed.webp",
            companyId: 4,
            companyName: "AgroTech Innovators",
            position: "Founder",
            bio: "IoT specialist focusing on bringing precision agriculture to local cooperative farming groups.",
            verified: true,
            linkedin: "https://linkedin.com",
            successRate: "85%"
        },
        {
            id: 'o5',
            name: "Tania Sultana",
            email: "tania.sultana@urbanliving.com",
            avatar: "/tania_sultana.webp",
            companyId: 5,
            companyName: "Urban Living Real Estate",
            position: "Director of Operations",
            bio: "Expert in premium real estate markets with a focus on vertical gardens and sustainable design.",
            verified: true,
            linkedin: "https://linkedin.com",
            successRate: "94%"
        }
    ],
    isLoading: false,
    error: null
}

const companyOwnerSlice = createSlice({
    name: 'companyOwners',
    initialState,
    reducers: {
        addOwner: (state, action) => {
            state.owners.push(action.payload)
        },
        updateOwner: (state, action) => {
            const index = state.owners.findIndex(o => o.id === action.payload.id)
            if (index !== -1) {
                state.owners[index] = { ...state.owners[index], ...action.payload }
            }
        }
    }
})

export const { addOwner, updateOwner } = companyOwnerSlice.actions

export const selectAllOwners = (state) => state.companyOwners.owners
export const selectOwnerByCompanyId = (state, companyId) => 
    state.companyOwners.owners.find(o => o.companyId === companyId)

export default companyOwnerSlice.reducer
