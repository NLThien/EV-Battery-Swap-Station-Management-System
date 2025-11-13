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

// Loader bảo vệ route
// đoạn này sẽ custom tùy theo role
export async function requireAuth({ request }: { request: Request }) {
  const token = getToken();

  if (!token) {
    const url = new URL(request.url);
    // chuyển hướng sang /login và nhớ đường dẫn gốc để quay lại
    throw redirect(`/?redirectTo=${encodeURIComponent(url.pathname)}`);
  } else {
    return null;
  }
}
