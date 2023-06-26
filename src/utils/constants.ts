import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_URL = 'http://192.168.0.236:8080';

export const axiosClient = axios.create({ baseURL: API_URL });

axiosClient.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('UserToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
