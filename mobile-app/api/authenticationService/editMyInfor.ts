import type { ApiResponse } from "./apiResponse";
import { privateApi } from "./httpResquest";
import { UserResponse } from "./login";

export interface UserUpdate {
  firstName: string;
  lastName: string;
  birthday: string;
  phoneNumber: string;
  email: string;
}

export const UpdateUser = async (request: UserUpdate) => {
  try {
    const response = await privateApi.put<ApiResponse<UserResponse>>(
      "/authentication/users/myInfo",
      request
    );
    return response.data.result;
  } catch (error) {
    console.log("Đổi thông tin không thành: " + error);
    throw error;
  }
};
