import { ApiResponse } from "./apiResponse";
import { publicApi } from "./httpResquest";

export interface AuthenticatedProps {
  valid: boolean;
}
//hàm này để kiểm tra token hợp lệ có thể cần
export const Authenticated = async (token: string) => {
  try {
    const response = await publicApi.post<ApiResponse<AuthenticatedProps>>(
      "/authentication/introspect",
      {
        token: token,
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Authentication error:", error);
    throw new Error("Post authentication failed");
  }
};
