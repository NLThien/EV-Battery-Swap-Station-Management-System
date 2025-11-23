import { getToken } from "@/utils/auth";
import { privateApi } from "./httpRequests";
import type { ApiResponse } from "./apiResponse";

export interface ChangePasswordProps {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const changePasswordMyInfo = async (request: ChangePasswordProps) => {
  const token = getToken();
  try {
    if (!token) {
      throw new Error("No access token found");
    }
    const response = await privateApi.put<ApiResponse<string>>(
      "/authentication/users/myInfo/changePassword",
      request
    );
    return response.data;
  } catch (error) {
    console.log("Đổi mật khẩu không thành: " + error);
    throw error;
  }
};
