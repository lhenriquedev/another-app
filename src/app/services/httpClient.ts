import axios from 'axios';

export const httpClient = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://10.0.2.2:3333' : process.env.EXPO_PUBLIC_API_URL,
  // baseURL: process.env.EXPO_PUBLIC_API_URL,
});
