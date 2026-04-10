import { configureStore } from '@reduxjs/toolkit'
import groupReducer from './slices/groupSlice'
import companyReducer from './slices/companySlice'
import newsReducer from './slices/newsSlice'
import postReducer from './slices/postSlice'

const store = configureStore({
    reducer: {
        groups: groupReducer,
        companies: companyReducer,
        news: newsReducer,
        posts: postReducer,
    }
})

export default store