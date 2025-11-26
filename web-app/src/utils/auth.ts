import { Authenticated } from "@/api/authentication/authenticated";
import { MyInfo, normalizeRoles } from "@/api/authentication/myInfo";
import { refreshToken } from "@/api/authentication/refreshToken";

import { redirect } from "react-router-dom";

export function getToken() {
  // Tuỳ bạn lưu ở đâu: localStorage / cookie / zustand, ...
  try {
    return localStorage.getItem("access_token"); //cái này là khi nào có token thật
    // return "fake_token"; //giả lập có token
  } catch {
    return null;
  }
}

// //để tạm đây chưa phải tối ưu nhất vì request lập lại
// export async function redirectIfAuthenticated() {
//   const token = getToken();
//   if (!token) return null;

//   try {
//     const resAuth = await Authenticated(token);

//     if (!resAuth?.valid) return null;

//     const user = await MyInfo();
//     if (!user) return null;

//     const userRoles = normalizeRoles(user.roles);

//     if (userRoles.includes("ADMIN")) {
//       throw redirect("/admin");
//     }

//     if (userRoles.includes("STAFF")) {
//       throw redirect("/staff");
//     }

//     return null;
//   } catch (e) {
//     //đừng bắt redirect - bắt error thật thôi
//     if (e instanceof Response) {
//       // đây là redirect => phải ném lại cho router
//       throw e;
//     }

//     console.error("redirectIfAuthenticated lỗi thật:", e);
//     return null;
//   }
// }

export function testAuth() {
  const token = getToken();
  if (!token) {
    return null;
  } else {
    return redirect("/staff");
  }
}

export function requireRole(requiredRoles: string[]) {
  return async ({ request }: { request: Request }) => {
    const token = getToken();
    console.log("token:" + token);

    // cho qua trang staff không cần kiểm tra quyền
    const p = new URL(request.url).pathname;

    if (p.startsWith("/staff")) {
      return null;
    }


    if (!token) {
      const url = new URL(request.url);
      // chuyển hướng sang /login và nhớ đường dẫn gốc để quay lại
      throw redirect(`/?redirectTo=${encodeURIComponent(url.pathname)}`);
    }

    // Kiểm tra quyền truy cập

    try {
      const resAuth = await Authenticated(token);

      if (resAuth.valid) {
        //thực thiên đăng nhâp
        const user = await MyInfo();
        localStorage.setItem("user", JSON.stringify(user));
        console.log("User info for role check:", user);
        console.log("Required roles:", user.roles);
        const userRoles = normalizeRoles(user.roles);
        const hasAccess = requiredRoles.some((role) =>
          userRoles.includes(role)
        );
        console.log("role:" + userRoles);
        if (!hasAccess) {
          if (userRoles.includes("ADMIN")) {
            return redirect(`/admin`);
          }
          if (userRoles.includes("STAFF")) {
            // có thể gọi API lấy thông tin của trạm gắn với staff nếu cần

            return redirect(`/staff`);
          }
          localStorage.removeItem("access_token");
          return redirect("/not-permission");
        }
        return null;
      } else {
        const response = await refreshToken(token);
        if (response.authenticated) {
          localStorage.setItem("access_token", response.token);
          const user = await MyInfo();
          localStorage.setItem("user", JSON.stringify(user));
          console.log("token refresh" + localStorage.getItem("access_token"));
          const userRoles = normalizeRoles(user.roles);
          const hasAccess = requiredRoles.some((role) =>
            userRoles.includes(role)
          );
          console.log("user sau khi refresh:" + user);
          console.log("role sau khi refresh:" + userRoles);
          if (!hasAccess) {
            if (userRoles.includes("ADMIN")) {
              return redirect(`/admin`);
            }
            if (userRoles.includes("STAFF")) {
              // có thể gọi API lấy thông tin của trạm gắn với staff nếu cần
              return redirect(`/staff`);
            }
            localStorage.removeItem("access_token");
            return redirect("/not-permission");
          }
          return null;
        }
      }
    } catch (error) {
      console.log("token không hợp lệ:" + error);
      localStorage.removeItem("access_token");
      throw redirect("/");
    }

    // try {
    // const user = await MyInfo();
    // console.log("User info for role check:", user);
    // console.log("Required roles:", user.roles);
    // const userRoles = normalizeRoles(user.roles);
    // const hasAccess = requiredRoles.some((role) => userRoles.includes(role));
    // console.log("role:" + userRoles);
    // if (!hasAccess) {
    //   if (userRoles.includes("ADMIN")) {
    //     // có thể gọi API lấy thông tin của trạm gắn với staff nếu cần
    //     return redirect(`/admin`);
    //   }
    //   if (userRoles.includes("STAFF")) {
    //     return redirect(`/staff`);
    //   }
    //   return redirect("/not-authorized");
    // }
    // return null;
    // } catch (error) {
    //   console.error("Lỗi khi lấy thông tin người dùng:", error);
    //refresh token hoặc chuyển hướng về trang đăng nhập
    // try {
    //   const response = await refreshToken(token);
    //   if (response.authenticated) {
    //     localStorage.setItem("access_token", response.token);
    //     const user: UserResponse = await MyInfo();
    //     const userRoles = normalizeRoles(user.roles);
    //     const hasAccess = requiredRoles.some((role) =>
    //       userRoles.includes(role)
    //     );
    //     console.log("user sau khi refresh:" + user);
    //     console.log("role sau khi refresh:" + userRoles);
    //     if (!hasAccess) {
    //       if (userRoles.includes("ADMIN")) {
    //         return redirect(`/admin`);
    //       }
    //       if (userRoles.includes("STAFF")) {
    //         // có thể gọi API lấy thông tin của trạm gắn với staff nếu cần
    //         return redirect(`/staff`);
    //       }
    //       return redirect("/not-authorized");
    //     }
    //     return null;
    //   }
    // } catch (error) {
    //   console.error(" refreshing lỗi token có thể không hợp lệ:", error);
    //   throw redirect("/");
    // }

    //   return null; //cho qua
    // }
  };
}
