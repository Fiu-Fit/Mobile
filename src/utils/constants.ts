import axios from 'axios';

export const API_URL = 'https://api-gateway-production.up.railway.app';

export const axiosClient = axios.create({ baseURL: API_URL });
