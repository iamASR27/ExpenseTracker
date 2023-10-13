import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        darkMode: localStorage.getItem("darkMode") || false,
        premium: localStorage.getItem("premiumState") || false,
    },
    reducers: {
        toggleDarkMode(state) {
            state.darkMode = !state.darkMode;
            localStorage.setItem("darkMode", state.darkMode);
        },
        togglePremium(state) {
            state.premium = !state.premium;
            localStorage.setItem("premiumState", state.premium);
        },
    }
});

export const themeActions = themeSlice.actions; 

export default themeSlice.reducer;
