import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated',
        token: null,
        user: null,
        errorMessage: null
    },
    reducers: {
        login: (state, { payload }) => {
            state.status = 'authenticated';
            state.token = payload.token;
            state.user = payload.user;
        },
        logout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.token = null;
            state.user = null;
            state.errorMessage = payload?.errorMessage;
        }
    }
});

export const { login, logout } = authSlice.actions;