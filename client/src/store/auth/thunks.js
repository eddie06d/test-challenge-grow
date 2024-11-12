import axios from 'axios';
import { login, logout } from './authSlice';

const API_URL = 'http://localhost:5001';

export const startLogin = (credentials = {}) => {
    return async (dispatch) => {
        const { data } = await axios.post(`${ API_URL }/auth/signup`, credentials);

        if(!data.success) return dispatch(logout({
            errorMessage: data.message
        }));

        dispatch(login({
            token: data.token,
            user: data.user
        }));
    };
};