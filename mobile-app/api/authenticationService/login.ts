import { saveSecureToken } from "@/utils/tokenStorage";
import { ApiResponse } from "./apiResponse";
import { publicApi } from "./httpResquest";

export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  birthday: string;
  phoneNumber: string;
  email: string;
  roles: string[];
  createAt: string;
  updateAt: string;
}

export interface LoginRequest {
  phoneNumber: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  authenticated: boolean;
}

export async function Login(data: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await publicApi.post<ApiResponse<LoginResponse>>(
      "/authentication/login",
      data
    );

    // Kiểm tra API trả về code 0
    if (response.data.code === 0 && response.data.result?.authenticated) {
      const token = response.data.result.token;

      // Lưu token vào Secure Store
      await saveSecureToken(token);

      return response.data.result;
    } else {
      throw new Error("Số điện thoại hoặc mật khẩu sai");
    }
  } catch (error: any) {
    console.error("Login error:", error);
    throw new Error(error?.message ?? "Login failed");
  }
}
