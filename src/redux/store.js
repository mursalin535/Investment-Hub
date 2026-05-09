import { configureStore } from '@reduxjs/toolkit'
import groupReducer from './slices/groupSlice'
import companyReducer from './slices/companySlice'
import newsReducer from './slices/newsSlice'
import postReducer from './slices/postSlice'
import investmentReducer from './slices/investmentSlice'
import userReducer from './slices/userSlice'
import companyOwnerReducer from './slices/companyOwnerSlice'

const store = configureStore({
    reducer: {
        groups: groupReducer,
        companies: companyReducer,
        news: newsReducer,
        posts: postReducer,
        investments: investmentReducer,
        user: userReducer,
        companyOwners: companyOwnerReducer,
    }
})

export default store