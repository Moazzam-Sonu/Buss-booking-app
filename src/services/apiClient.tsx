import axios from 'axios';
import {setAccessToken, getRefreshToken, getAccessToken} from './storage';
import {BASE_URL} from './config';

const apiClient = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor to handle token refresh
apiClient.interceptors.request.use(
  async config => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle token refresh
apiClient.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    // If the error is due to an expired token
    if (error.response.status === 403) {
      // Attempt to refresh the token
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        return Promise.reject(error);
      }
      try {
        const {data} = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken: refreshToken,
        });
        setAccessToken(data?.accessToken);
        error.config.headers.Authorization = `Bearer ${data?.accessToken}`;
        return axios.request(error.config);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
export default apiClient;
