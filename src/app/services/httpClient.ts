import axios from 'axios';

// const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:3333';
export const httpClient = axios.create({
  baseURL: 'http://10.0.2.2:3333',
});
