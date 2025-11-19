import { getToken } from "@/utils/auth";

import { privateApi } from "./httpRequests";
import type { UserResponse } from "./register";
import type { ApiResponse } from "./apiResponse";
import type { UserUpdate } from "./editMyInfor";

export const UpdateUserByAdmin = async (
  request: UserUpdate,
  userId: string
) => {
  const token = getToken();
  try {
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await privateApi.put<ApiResponse<UserResponse>>(
      `/authentication/users/${userId}`,
      request
    );
    return response.data.result;
  } catch (error) {
    console.log("Đổi thông tin không thành: " + error);
    throw error;
  }
};
