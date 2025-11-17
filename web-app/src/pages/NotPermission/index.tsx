import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotPermission() {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-2xl p-8 border border-gray-100 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
          <span className="text-red-500 text-3xl font-bold">!</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
          Bạn không có quyền truy cập
        </h1>

        <p className="text-gray-500 mb-6">
          Có vẻ như tài khoản hiện tại không đủ quyền để xem trang này. Nếu bạn
          nghĩ đây là nhầm lẫn, hãy liên hệ quản trị viên hoặc thử đăng nhập
          bằng tài khoản khác.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleGoBack}
            className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100 transition"
          >
            Quay lại
          </button>
          <button
            onClick={handleGoHome}
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
          >
            Về trang chủ
          </button>
        </div>

        <p className="mt-6 text-xs text-gray-400">
          Mã lỗi: <span className="font-mono">403 – Forbidden</span>
        </p>
      </div>
    </div>
  );
}

export default NotPermission;
