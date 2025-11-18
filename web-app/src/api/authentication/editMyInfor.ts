import { getToken } from "@/utils/auth";

import { privateApi } from "./httpRequests";
import type { UserResponse } from "./register";
import type { ApiResponse } from "./apiResponse";

export interface UserUpdate {
  firstName: string;
  lastName: string;
  birthday: string;
  phoneNumber: string;
  email: string;
}

export const UpdateUser = async (request: UserUpdate) => {
  const token = getToken();
  try {
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await privateApi.put<ApiResponse<UserResponse>>(
      "/authentication/users/myInfo",
      request
    );
    return response.data.result;
  } catch (error) {
    console.log("Đổi mật khẩu không thành: " + error);
    throw error;
  }
};
