import { publicApi } from "./httpResquest";

export const Logout = async (token: string) => {
  // Xoá token khỏi localStorage
  await publicApi.post("/authentication/logout", {
    token: token,
  });

  // Chuyển hướng về trang đăng nhập
};
