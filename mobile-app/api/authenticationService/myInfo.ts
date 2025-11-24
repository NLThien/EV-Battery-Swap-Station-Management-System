import type { ApiResponse } from "./apiResponse";
import { privateApi } from "./httpResquest";
import { UserResponse } from "./login";

export const MyInfo = async (token: string) => {
  try {
    // const token = await getSecureToken(); // hoặc getToken();
    // console.log("token myinfo:" + token);
    // if (!token) {
    //   throw new Error("No access token found");
    // }

    console.log("1: " + token);
    const response = await privateApi.get<ApiResponse<UserResponse>>(
      "/authentication/users/myInfo"
    );
    console.log("2");
    return response.data.result;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};
export function normalizeRoles(roles?: string[]): string[] {
  return Array.isArray(roles) ? roles.map((r) => r?.toUpperCase?.() ?? "") : [];
}
