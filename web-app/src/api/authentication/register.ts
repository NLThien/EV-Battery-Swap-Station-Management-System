import type { ApiResponse } from "./apiResponse";
import { publicApi } from "./httpRequests";

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  birthday: string;
  phoneNumber: string;
  email: string;
  password: string;
}

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

// Hàm đăng ký người dùng
export async function Register(data: RegisterRequest) {
  try {
    const response = await publicApi.post<ApiResponse<UserResponse>>(
      "/authentication/users",
      data
    );
    return response.data.result;
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("Failed to register user");
  }
}
