import { getToken } from "@/utils/auth";
import { privateApi } from "./httpRequests";
import type { ApiResponse } from "./apiResponse";

export interface ChangePasswordUserProps {
  password: string;
}

export const changePasswordUser = async (
  userId: string,
  changePassword: ChangePasswordUserProps
) => {
  const token = getToken();
  try {
    if (!token) {
      throw new Error("No access token found");
    }
    const response = await privateApi.put<ApiResponse<string>>(
      `/authentication/users/${userId}/changePassword`,
      changePassword
    );
    return response.data;
  } catch (error) {
    console.log("Đổi mật khẩu không thành: " + error);
    throw error;
  }
};
