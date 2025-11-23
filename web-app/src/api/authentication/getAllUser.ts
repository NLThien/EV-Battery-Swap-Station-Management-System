import { getToken } from "@/utils/auth";
import { privateApi } from "./httpRequests";

import type { UserResponse } from "./register";
import type { ApiResponse } from "./apiResponse";

export const getUsers = async () => {
  const token = getToken();

  try {
    if (!token) {
      throw new Error("Lỗi ! không có token");
    }
    const res = await privateApi.get<ApiResponse<UserResponse[]>>(
      "/authentication/users"
    );
    return res.data.result;
  } catch (error) {
    console.log("Lấy dữ liệu không thành: " + error);
    throw error;
  }
};
