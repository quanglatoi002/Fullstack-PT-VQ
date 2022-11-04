import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
});

// Add a request interceptor
axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        // header = token
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

// Add a response interceptor
axios.interceptors.response.use(
    function (response) {
        //    refresh token
        return response;
    },
    function (error) {
        return Promise.reject(error);
    },
);

export default instance;
