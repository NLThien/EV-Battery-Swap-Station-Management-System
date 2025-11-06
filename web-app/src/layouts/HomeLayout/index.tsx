import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { AuthModal } from "@/components";
import { useState } from "react";

function HomeLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // true = login, false = register

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit form");

    // Nếu là login: gọi API login
    // Nếu là register: gọi API register

    // Sau khi xử lý xong: đóng modal (nếu muốn)
    setIsOpen(false);
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
          onSubmit={handleSubmit}
        />
        <Outlet />
      </div>
      {/* dday la footer */}
      <Footer />
    </div>
  );
}

export default HomeLayout;
