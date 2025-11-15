import type { ApiResponse } from "./apiResponse";
import { publicApi } from "./httpRequests";
import type { LoginResponse } from "./login";

export const refreshToken = async (token: string) => {
  try {
    const response = await publicApi.post<ApiResponse<LoginResponse>>(
      "/authentication/refresh",
      {
        token: token,
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("token không hợp lệ:", error);
    throw new Error("Refresh token failed");
  }
};
