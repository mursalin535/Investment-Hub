import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: [
        {
            id: 'u1',
            name: 'Mehedi Hasan',
            email: 'mehedi@example.com',
            avatar: '/user_mehedi.webp',
            role: 'investor',
            location: 'Dhaka',
            bio: 'Tech enthusiast and active investor in sustainable agriculture.',
            joinedDate: '2023-11-10',
            stats: { investments: 12, following: 45, insights: 8 }
        },
        {
            id: 'u2',
            name: 'Anisur Rahman',
            email: 'anisur@example.com',
            avatar: '/anisur_rahman.webp',
            role: 'entrepreneur',
            location: 'Dhaka',
            bio: 'Senior Software Engineer with a passion for organic farming.',
            joinedDate: '2023-05-15',
            stats: { investments: 2, following: 120, insights: 15 }
        },
        {
            id: 'u3',
            name: 'Farhana Akter',
            email: 'farhana@example.com',
            avatar: '/farhana_akter.webp',
            role: 'entrepreneur',
            location: 'Sylhet',
            bio: 'Strategic business owner focusing on digital transformation.',
            joinedDate: '2023-08-20',
            stats: { investments: 5, following: 80, insights: 12 }
        },
        {
            id: 'u4',
            name: 'Mahidul Hasan',
            email: 'mahidul@example.com',
            avatar: '/mahidul_hasan.webp',
            role: 'investor',
            location: 'Chittagong',
            bio: 'Corporate executive interested in real estate and fintech.',
            joinedDate: '2024-01-05',
            stats: { investments: 8, following: 60, insights: 4 }
        },
        {
            id: 'u5',
            name: 'Nursrat Jahan',
            email: 'nursrat@example.com',
            avatar: '/nursrat_jahan.webp',
            role: 'investor',
            location: 'Rajshahi',
            bio: 'Education consultant building a diverse investment portfolio.',
            joinedDate: '2023-12-12',
            stats: { investments: 3, following: 30, insights: 2 }
        },
        {
            id: 'u6',
            name: 'Tania Sultana',
            email: 'tania@example.com',
            avatar: '/tania_sultana.webp',
            role: 'entrepreneur',
            location: 'Barisal',
            bio: 'Creative director exploring sustainable urban developments.',
            joinedDate: '2024-02-10',
            stats: { investments: 0, following: 150, insights: 25 }
        },
        {
            id: 'u7',
            name: 'Zubair Ahmed',
            email: 'zubair@example.com',
            avatar: '/zubair_ahmed.webp',
            role: 'entrepreneur',
            location: 'Khulna',
            bio: 'Freelance professional specializing in IoT for agriculture.',
            joinedDate: '2023-03-25',
            stats: { investments: 1, following: 200, insights: 30 }
        },
        {
            id: 'u8',
            name: 'Fahmida Khatun',
            email: 'fahmida@example.com',
            avatar: '/user_fahmida.webp',
            role: 'investor',
            location: 'Dhaka',
            bio: 'Passionate about social impact through strategic investments.',
            joinedDate: '2023-06-18',
            stats: { investments: 15, following: 95, insights: 10 }
        },
        {
            id: 'u9',
            name: 'Imran Khan',
            email: 'imran@example.com',
            avatar: '/user_imran.webp',
            role: 'entrepreneur',
            location: 'Dhaka',
            bio: 'Building the future of robotics and automation in Bangladesh.',
            joinedDate: '2023-09-02',
            stats: { investments: 0, following: 340, insights: 45 }
        },
        {
            id: 'u10',
            name: 'Nadia Islam',
            email: 'nadia@example.com',
            avatar: '/user_nadia.webp',
            role: 'entrepreneur',
            location: 'Dhaka',
            bio: 'Committed to providing clean water solutions for everyone.',
            joinedDate: '2023-07-14',
            stats: { investments: 4, following: 110, insights: 18 }
        },
        {
            id: 'u11',
            name: 'Rafiul Alam',
            email: 'rafiul@example.com',
            avatar: '/user_rafiul.webp',
            role: 'entrepreneur',
            location: 'Dhaka',
            bio: 'Pioneering zero-waste biofuel production from agrowaste.',
            joinedDate: '2023-04-30',
            stats: { investments: 2, following: 85, insights: 22 }
        },
        {
            id: 'u12',
            name: 'Shakila Perveen',
            email: 'shakila@example.com',
            avatar: '/user_shakila.webp',
            role: 'investor',
            location: 'Dhaka',
            bio: 'Experienced financial analyst identifying high-growth ventures.',
            joinedDate: '2023-10-22',
            stats: { investments: 20, following: 130, insights: 12 }
        }
    ],
    isLoading: false,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users.push(action.payload)
        },
        updateUser: (state, action) => {
            const index = state.users.findIndex(u => u.id === action.payload.id)
            if (index !== -1) {
                state.users[index] = { ...state.users[index], ...action.payload }
            }
        }
    }
})

export const { addUser, updateUser } = userSlice.actions

export const selectAllUsers = (state) => state.user.users
export const selectUserById = (state, id) => state.user.users.find(u => u.id === id)

export default userSlice.reducer
