// import axios, { AxiosError } from "axios";
// import { getSecureToken, saveSecureToken, removeSecureToken, removeSecureUser } from "@/utils/tokenStorage";
// import { refreshToken } from "@/api/authenticationService/refeshToken";

// export const privateApi = axios.create({
//   baseURL: "http://localhost:8080", // hoặc ENV
// });

// //  Request interceptor: tự gắn Authorization
// privateApi.interceptors.request.use(
//   async (config) => {
//     const token = await getSecureToken();
//     if (token) {
//       config.headers = config.headers || {};
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// type CustomConfig = typeof privateApi.defaults & { _retry?: boolean };

// //  Response interceptor: refresh token khi 401
// privateApi.interceptors.response.use(
//   (res) => res,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as CustomConfig;

//     if (!originalRequest || error.response?.status !== 401) {
//       return Promise.reject(error);
//     }

//     if (originalRequest._retry) {
//       return Promise.reject(error);
//     }

//     originalRequest._retry = true;

//     try {
//       const oldToken = await getSecureToken();
//       if (!oldToken) {
//         await removeSecureToken();
//         await removeSecureUser();
//         return Promise.reject(error);
//       }

//       const refreshed = await refreshToken(oldToken);
//       const newAccessToken = refreshed.token;

//       if (!newAccessToken) {
//         throw new Error("Backend không trả về token mới");
//       }

//       await saveSecureToken(newAccessToken);

//       // gắn token mới vào request cũ
//       originalRequest.headers = originalRequest.headers || {};
//       originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

//       return privateApi(originalRequest);
//     } catch (err) {
//       await removeSecureToken();
//       await removeSecureUser();
//       return Promise.reject(err);
//     }
//   }
// );

import type { ApiResponse } from "./apiResponse";
import { publicApi } from "./httpResquest";
import type { LoginResponse } from "./login";

export const refreshToken = async (token: string) => {
  try {
    const response = await publicApi.post<ApiResponse<LoginResponse>>(
      "/authentication/refresh",
      {
        token: token,
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("token không hợp lệ:", error);
    throw new Error("Refresh token failed");
  }
};
