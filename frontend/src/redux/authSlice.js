import { createSlice } from "@reduxjs/toolkit";



const authSlice = createSlice({
    name: "auth",
    initialState:{
        loading:false,
        user:null
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload)); // Save to localStorage
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user"); // Clear localStorage on logout
        },
    },
});

export const { setLoading, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
