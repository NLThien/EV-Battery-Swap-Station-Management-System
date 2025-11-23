import axios from "axios";

// // Thêm _retry vào config
// interface CustomConfig extends InternalAxiosRequestConfig {
//   _retry?: boolean;
// }

export const publicApi = axios.create({
  baseURL: "http://localhost:8085",
  headers: {
    "Content-Type": "application/json",
  },
});

export const privateApi = axios.create({
  baseURL: "http://localhost:8085",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Gắn token tự động nếu có
privateApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// privateApi.interceptors.response.use(
//   (res) => res,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as CustomConfig;

//     if (!originalRequest || error.response?.status !== 401) {
//       return Promise.reject(error);
//     }
//     // Tránh lặp vô hạn
//     if (originalRequest._retry) {
//       return Promise.reject(error);
//     }

//     originalRequest._retry = true;

//     try {
//       const oldToken = getToken();
//       if (!oldToken) {
//         // clearAllAuth();
//         console.log("xóa token");
//         localStorage.removeItem("access_token");
//         localStorage.removeItem("user");
//         return Promise.reject(error);
//       }

//       // Gọi hàm refresh bạn gửi
//       const refreshed = await refreshToken(oldToken);
//       console.log("refresh token");

//       // refreshed có dạng LoginResponse = { token: string }
//       const newAccessToken = refreshed.token;

//       if (!newAccessToken) {
//         throw new Error("Backend không trả về token mới");
//       }

//       // LƯU token mới
//       localStorage.setItem("access_token", newAccessToken);
//       // hoặc localStorage.setItem("access_token", newAccessToken);

//       // GẮN token mới vào header request cũ
//       if (originalRequest.headers) {
//         const headers = originalRequest.headers as any;

//         if (typeof headers.set === "function") {
//           headers.set("Authorization", `Bearer ${newAccessToken}`);
//         } else {
//           headers["Authorization"] = `Bearer ${newAccessToken}`;
//         }
//       } else {
//         originalRequest.headers = {
//           Authorization: `Bearer ${newAccessToken}`,
//         } as any;
//       }

//       // Gửi lại request cũ
//       return privateApi(originalRequest);
//     } catch (err) {
//       // Refresh lỗi → xoá token & điều hướng về login
//       // clearAllAuth();
//       localStorage.removeItem("access_token");
//       localStorage.removeItem("user");
//       return Promise.reject(err);
//     }
//   }
// );
