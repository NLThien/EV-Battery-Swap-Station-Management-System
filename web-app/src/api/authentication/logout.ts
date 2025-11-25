import { publicApi } from "./httpRequests";

export const Logout = async () => {
  // Xoá token khỏi localStorage
  await publicApi.post("/authentication/logout", {
    token: localStorage.getItem("access_token"),
  });
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
  // Chuyển hướng về trang đăng nhập
  window.location.href = "/";
};
