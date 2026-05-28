import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedIn:true,
    user: { 
        role: 'none',
        userInfo: null
    }
};

const cookieSlice = createSlice({
    name: 'cookie',
    initialState,
    reducers: {
        setCookie: (state, action) => {
            state.loggedIn = true;
            state.user.role = action.payload.role;
            state.user.userInfo = action.payload.userInfo;
        },
        clearCookie: (state) => {
            state.loggedIn = false;
            state.user = { role: 'none', userInfo: null };
        }
    }
});

export const { setCookie, clearCookie } = cookieSlice.actions;
export default cookieSlice.reducer;