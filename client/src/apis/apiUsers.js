import axios from "axios";
import { store } from "../store/store";

const API_URL = 'http://localhost:5001';

export const apiUsers = axios.create({
    baseURL: `${ API_URL }/users`
});

apiUsers.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;
        if(token) config.headers['Authorization'] = `Bearer ${ token }`;
        return config;
    },
    (error) => Promise.reject(error)
);
