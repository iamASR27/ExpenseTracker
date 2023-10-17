import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    token: localStorage.getItem("token") || null,
    userId: localStorage.getItem("userId") || null,
    isLoggedIn: !!localStorage.getItem("token"),
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            // localStorage.setItem("token", action.payload);
        },
        logout(state) {
            state.isLoggedIn = false;
            state.token = null;
            state.userId = null;
            // localStorage.removeItem("token");
        },
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;