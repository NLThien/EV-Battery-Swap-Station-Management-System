import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { AuthModal } from "@/components";
import { useEffect, useState } from "react";

import { Login, type LoginRequest } from "@/api/authentication/login";
import { CustomDialog } from "@/components/ui/Dialog";
import { formatPhoneNumberVN } from "@/utils/formatPhoneNumber";
import { Register, type RegisterRequest } from "@/api/authentication/register";
import { SpinnerButton } from "@/components/ui/SpinerButton";

function HomeLayout() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // true = login, false = register
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openDialogRegister, setOpenDialogRegister] = useState(false);
  const [sucssesRegister, setSuccessRegister] = useState(false);
  const [formData, setFormData] = useState<LoginRequest>({
    phoneNumber: "",
    password: "",
  });
  const [dataRegister, setDataRegister] = useState<RegisterRequest>({
    firstName: "",
    lastName: "",
    birthday: "",
    phoneNumber: "",
    email: "",
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

      // navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit Login:", formData);
    setIsLoading(true);
    // Gọi API login ở đây
    try {
      const formatPhoneNumber = formatPhoneNumberVN(formData.phoneNumber);
      console.log("Formatted Phone Number:", formatPhoneNumber);
      const res = await Login({ ...formData, phoneNumber: formatPhoneNumber });
      console.log("Login response:");
      if (res) {
        //cái này tùy có thể chuyển hướng để admin hoặc staff tùy vai trò role
        console.log("Đăng nhập thành công");

        setIsLoading(false);
        return res;
      }
    } catch (error) {
      console.error("Login error:", "đăng nhập thất bại", error);
      setOpenDialog(true);
      setIsLoading(false);
    }
  };

  //nhấn nút đăng ký
  const handleSubmitRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit Register:", dataRegister);
    setIsLoading(true);
    // Gọi API register ở đây
    try {
      const formatPhoneNumber = formatPhoneNumberVN(dataRegister.phoneNumber);

      console.log("Formatted Phone Number:", formatPhoneNumber);
      // Gọi API đăng ký với số điện thoại đã định dạng
      const res = await Register({
        ...dataRegister,
        phoneNumber: formatPhoneNumber,
      });
      console.log("Register response:", dataRegister);
      console.log("Đăng ký thành công:", res);
      setSuccessRegister(true);
      setIsLogin(true);
      setIsLoading(false);
      return res;
    } catch (error) {
      console.error("Register error:", "đăng ký thất bại", error);
      setOpenDialogRegister(true);
      setIsLoading(false);
    }
  };

  //thay đổi input đăng ký
  const onChangeInputRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataRegister((prev) => ({ ...prev, [name]: value }));
  };

  //thay đổi input đăng nhập
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
          formRegister={dataRegister}
          onChangeRegister={onChangeInputRegister}
          onSubmitLogin={handleSubmitLogin}
          onSubmitRegister={handleSubmitRegister}
        />
        {/* khi đăng nhập bị lỗi */}
        <CustomDialog
          isOpen={openDialog}
          onOpenChange={setOpenDialog}
          title="Lỗi đăng nhập"
          description="Vui lòng kiểm tra lại thông tin đăng nhập."
        />
        {/* khi đăng ký bị lỗi */}
        <CustomDialog
          isOpen={openDialogRegister}
          onOpenChange={setOpenDialogRegister}
          title="Lỗi đăng ký"
          description="Vui lòng kiểm tra lại thông tin đăng ký có thể sđt hoặc email đã được sử dụng."
        />
        {/* khi đăng ký thành công */}
        <CustomDialog
          isOpen={sucssesRegister}
          onOpenChange={setSuccessRegister}
          title="Đăng ký thành công"
          description="Chúc mừng bạn đã đăng ký thành công. Vui lòng đăng nhập để tiếp tục."
        />
        {/* spinner Loading  */}
        {isLoading && <SpinnerButton />}
        <Outlet />
      </div>
      {/* dday la footer */}
      <Footer />
    </div>
  );
}

export default HomeLayout;
