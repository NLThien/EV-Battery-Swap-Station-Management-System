// hàm này để lấy đữ liệu người dùng hiện tại

import { getToken } from "@/utils/auth";
import { privateApi } from "./httpRequests";
import type { ApiResponse } from "./apiResponse";
import type { UserResponse } from "./register";

export const MyInfo = async () => {
  try {
    const token = getToken(); // hoặc getToken();
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await privateApi.get<ApiResponse<UserResponse>>(
      "/authentication/myInfo",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};

export function normalizeRoles(roles?: string[]): string[] {
  return Array.isArray(roles) ? roles.map((r) => r?.toUpperCase?.() ?? "") : [];
}
