import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        list: [],
        pagination: null
    },
    reducers: {
        setUsers: (state, { payload }) => {
            state.list = payload.users;
            state.pagination = payload.pagination;
        },
        updateUserAction: (state, { payload }) => {
            state.list = state.list.map(user => {
                if(user.id === payload.id) return payload;
                return user;
            });
        },
        clearUsersLogout: (state) => {
            state.list = [];
            state.pagination = null;
        },
        deleteUserAction: (state, { payload }) => {
            state.list = state.list.filter(user => user.id !== payload);
        }
    }
});

export const { setUsers, updateUserAction, clearUsersLogout, deleteUserAction } = usersSlice.actions;