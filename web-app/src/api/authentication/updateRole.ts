import { privateApi } from "./httpRequests";

export interface UpdateRole {
  role: "ADMIN" | "STAFF" | "USER";
}

export const updateRole = async (role: UpdateRole, userId: string) => {
  try {
    const response = await privateApi.put(
      `/authentication/users/${userId}/role`,
      role
    );

    return response.data;
  } catch (error) {
    console.log("không thể đổi quyền: " + error);
    throw error;
  }
};
