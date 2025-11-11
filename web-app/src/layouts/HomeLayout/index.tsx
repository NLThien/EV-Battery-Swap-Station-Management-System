import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { AuthModal } from "@/components";
import { useEffect, useState } from "react";

import { Login, type LoginRequest } from "@/api/authentication/login";
import { CustomDialog } from "@/components/ui/Dialog";

function HomeLayout() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // true = login, false = register
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState<LoginRequest>({
    phoneNumber: "",
    password: "",
  });

  const openLogin = () => {
    setIsLogin(true);
    setIsOpen(true);
  };

  const openRegister = () => {
    setIsLogin(false);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const toggleMode = () => setIsLogin((prev) => !prev);

  //kiểm tra token nếu có thì dùng API token
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      console.log("Token found in localStorage. Redirecting...");
      // Sử dụng navigate thay vì window.location.href
      navigate("/admin", { replace: true });
    }
  }, [navigate]); // Chỉ chạy khi component mount lần đầu

  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit Login:", formData);

    // Gọi API login ở đây
    try {
      const res = await Login(formData);
      console.log("Login response:", res);
      if (res) {
        window.location.href = "/admin";
        console.log("Đăng nhập thành công");
      }
    } catch (error) {
      console.error("Login error:", "đăng nhập thất bại", error);
      setOpenDialog(true);
    }

    setIsOpen(false);
  };

  //nhấn nút đăng ký
  const handleSubmitRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit register form");
    setIsOpen(false);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col">
      <Header onAuthClickLogin={openLogin} onAuthClickRegister={openRegister} />
      {/* day la noi dung cua trang */}
      <div className="mt-14">
        <AuthModal
          isOpen={isOpen}
          isLogin={isLogin}
          onClose={closeModal}
          onToggleMode={toggleMode}
          onChange={onChangeInput}
          formLogin={formData}
          onSubmitLogin={handleSubmitLogin}
          onSubmitRegister={handleSubmitRegister}
        />
        <CustomDialog
          isOpen={openDialog}
          onOpenChange={setOpenDialog}
          title="Lỗi đăng nhập"
          description="Vui lòng kiểm tra lại thông tin đăng nhập."
        />
        <Outlet />
      </div>
      {/* dday la footer */}
      <Footer />
    </div>
  );
}

export default HomeLayout;
