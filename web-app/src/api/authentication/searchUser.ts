import { getToken } from "@/utils/auth";
import type { ApiResponse } from "./apiResponse";
import { privateApi } from "./httpRequests";
import type { UserResponse } from "./register";

export const SearchUser = async (phone: string) => {
  const token = getToken();
  if (!token) {
    throw new Error("No access token found");
  }
  try {
    const response = await privateApi.get<ApiResponse<UserResponse[]>>(
      "/authentication/users/search?",
      {
        params: { phoneNumber: phone }, // <--- đây mới là query real
      }
    );

    return response.data.result;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return []; // trả về mảng rỗng
    }
    throw error;
  }
};
