// import type { AxiosError, InternalAxiosRequestConfig } from "axios";
// import { privateApi } from "./httpRequests";

// interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
//   _retry?: boolean;
// }

// interface RefreshResponse {
//   token: string;
// }

// privateApi.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as CustomAxiosRequestConfig;

//     // Không xử lý refresh cho chính /refresh
//     if (originalRequest?.url?.includes("refresh")) {
//       return Promise.reject(error);
//     }

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const res = await privateApi.post<RefreshResponse>(
//           "refresh",
//           {},
//           { withCredentials: true }
//         );

//         const newToken = res.data.token;
//         localStorage.setItem("access_token", newToken);

//         if (originalRequest.headers) {
//           const headers = originalRequest.headers;

//           if (typeof headers.set === "function") {
//             headers.set("Authorization", `Bearer ${newToken}`);
//           } else {
//             headers["Authorization"] = `Bearer ${newToken}`;
//           }
//         }

//         return privateApi(originalRequest);
//       } catch (refreshError) {
//         localStorage.removeItem("access_token");
//         window.location.href = "/login";
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );
