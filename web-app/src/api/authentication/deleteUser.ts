import { privateApi } from "./httpRequests";

export const deleteUser = async (userId: string) => {
  try {
    const res = await privateApi.delete(`/authentication/users/${userId}`);

    return res.data;
  } catch (error) {
    console.log("Xóa thất bại: " + error);
    throw error;
  }
};
