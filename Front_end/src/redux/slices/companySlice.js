import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// fix 4: useEffect can't be used in a slice file — use createAsyncThunk instead
export const fetchCompanies = createAsyncThunk('companies/fetchAll', async (_, thunkAPI) => {
    try {
        const res = await fetch('http://localhost:5009/getcomp')
        const data = await res.json()           // fix 4: must call .json() to parse
        if (!data.success) throw new Error(data.message)
        return data.data                        // array of companies
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message)
    }
})

const initialState = {
    companies: [],
    selectedCompany: null,
    loading: false,
    error: null,
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
                const post = c.posts?.find(p => p.id === postId)
                if (post) post.likes += 1
            })
        },
    },
    // fix 4: handle async thunk lifecycle
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompanies.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCompanies.fulfilled, (state, action) => {
                state.loading = false
                state.companies = action.payload
            })
            .addCase(fetchCompanies.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const { selectCompany, clearSelectedCompany, likeCompanyPost } = companySlice.actions

// Selectors
export const selectAllCompanies     = (state) => state.companies.companies
export const selectSelectedCompany  = (state) => state.companies.selectedCompany
export const selectLoading          = (state) => state.companies.loading
export const selectError            = (state) => state.companies.error
export const selectAllCompanyPosts  = (state) => {
    if (!state.companies?.companies) return []
    return state.companies.companies.flatMap(c => c.posts || [])
}

export default companySlice.reducer