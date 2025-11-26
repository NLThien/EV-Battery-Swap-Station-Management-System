import axios from "axios";
import { getToken, deleteToken } from "../lib/secure";

// API Gateway
const BASE_URL = "http://localhost:8080";

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      console.warn("Token hết hạn. Xóa token.");

      await deleteToken();

    }

    return Promise.reject(error);
  }
);

export default apiClient;
