import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const axiosInstance = axios.create({ baseURL, timeout: 15000 });

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('rbac_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('rbac_token');
      localStorage.removeItem('rbac_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);
