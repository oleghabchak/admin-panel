import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://health-api.dev.cgmme.com',
});
