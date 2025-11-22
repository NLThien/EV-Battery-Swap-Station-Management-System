import { ApiResponse } from "./apiResponse";
import { publicApi } from "./httpResquest";
import { UserResponse } from "./login";

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  birthday: string;
  phoneNumber: string;
  email: string;
  password: string;
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
