import type { ApiResponse } from "./apiResponse";
import { publicApi } from "./httpRequests";

export interface LoginRequest {
  phoneNumber: string;
  password: string;
}

interface LoginResponse {
  token: string;
  authenticated: boolean;
}

export async function Login(data: LoginRequest) {
  try {
    const response = await publicApi.post<ApiResponse<LoginResponse>>(
      "/authentication/login",
      data
    );
    if (response.data.code === 0 && response.data.result.authenticated) {
      const token = response.data.result.token;
      // ⭐ LƯU TOKEN VÀO localStorage
      localStorage.setItem("access_token", token);

      return response.data.result;
    }
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Post login failed");
  }
}
