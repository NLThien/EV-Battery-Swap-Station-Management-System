import { getSecureToken } from "@/utils/tokenStorage";
import axios from "axios";

export const publicApi = axios.create({
  baseURL: "http://10.0.2.2:8085",
  headers: {
    "Content-Type": "application/json",
  },
});

export const privateApi = axios.create({
  baseURL: "http://10.0.2.2:8085",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 🔥 Interceptor gắn token tự động

privateApi.interceptors.request.use(
  async (config) => {
    // 1. Đọc token từ Secure Storage
    const token = await getSecureToken();

    // 2. Chỉ gắn token nếu nó tồn tại
    if (token) {
      // Đảm bảo headers tồn tại trước khi truy cập
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 3. Trả về cấu hình đã sửa đổi
    return config;
  },
  // Hàm xử lý lỗi yêu cầu (Thường dùng để log lỗi cấu hình request)
  (error) => {
    console.error("Lỗi trong Request Interceptor:", error);
    return Promise.reject(error);
  }
);
