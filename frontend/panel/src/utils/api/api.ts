import axios from 'axios';

// axios global config
export const api = axios.create({
  baseURL: process.env.PUBLIC_API_URL,
  withCredentials: true
});

// interceptors to inject token and lead with erros
api.interceptors.request.use((config) => {
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='))
    ?.split('=')[1];

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  };

  return config;
});

// validating token
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // if invalid token
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);