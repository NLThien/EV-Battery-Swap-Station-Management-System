import { X } from "lucide-react";
import "./AuthModal.css";

import type { LoginRequest } from "@/api/authentication/login";
import { useState } from "react";
import type { RegisterRequest } from "@/api/authentication/register";

interface AuthModalProps {
  isOpen: boolean;
  isLogin: boolean;
  formLogin: LoginRequest;
  formRegister: RegisterRequest;
  onClose: () => void;
  onToggleMode: () => void;
  onSubmitLogin: (e: React.FormEvent) => void;
  onSubmitRegister: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeRegister: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AuthModal = ({
  isOpen,
  isLogin,
  onClose,
  onToggleMode,
  onSubmitLogin,
  onSubmitRegister,
  onChange,
  formLogin,
  formRegister,
  onChangeRegister,
}: AuthModalProps) => {
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<{
    phoneNumber?: string;
    password?: string;
  }>({});

  const [errorsRegister, setErrorsRegister] = useState<{
    firstName?: string;
    lastName?: string;
    birthday?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { phoneNumber?: string; password?: string } = {};
    const newErrorsRegister: {
      firstName?: string;
      lastName?: string;
      birthday?: string;
      email?: string;
      phoneNumber?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    // 🧭 Kiểm tra số điện thoại
    const phoneRegex = /^(0|\+84)(1|3|5|7|8|9)\d{8}$/;
    const passwordRegex = /^.{8,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nameRegex = /^[A-Za-zÀ-ỹ\s]+$/;

    if (isLogin) {
      if (!formLogin.phoneNumber.trim()) {
        newErrors.phoneNumber = "Vui lòng nhập số điện thoại";
      } else if (!phoneRegex.test(formLogin.phoneNumber)) {
        newErrors.phoneNumber =
          "Số điện thoại không hợp lệ (VD: 0336066709 hoặc +84336066709)";
      }

      // 🧭 Kiểm tra mật khẩu
      if (!formLogin.password) {
        newErrors.password = "Vui lòng nhập mật khẩu";
      } else if (!passwordRegex.test(formLogin.password)) {
        newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự";
      }
      return newErrors;
    } else {
      //đăng ký
      if (!formRegister.firstName.trim()) {
        newErrorsRegister.firstName = "Vui lòng nhập họ";
      } else if (!nameRegex.test(formRegister.firstName)) {
        newErrorsRegister.firstName = "Họ không hợp lệ";
      }

      if (!formRegister.lastName.trim()) {
        newErrorsRegister.lastName = "Vui lòng nhập tên";
      } else if (!nameRegex.test(formRegister.lastName)) {
        newErrorsRegister.lastName = "Tên không hợp lệ";
      }

      if (!formRegister.birthday.trim()) {
        newErrorsRegister.birthday = "Vui lòng nhập ngày sinh";
      }

      if (!formRegister.phoneNumber.trim()) {
        newErrorsRegister.phoneNumber = "Vui lòng nhập số điện thoại";
      } else if (!phoneRegex.test(formRegister.phoneNumber)) {
        newErrorsRegister.phoneNumber =
          "Số điện thoại không hợp lệ (VD: 0336066709 hoặc +84336066709)";
      }
      // 🧭 Kiểm tra email (nếu có)
      if (formRegister.email) {
        if (!emailRegex.test(formRegister.email)) {
          newErrorsRegister.email = "Email không hợp lệ";
        }
      }
      // 🧭 Kiểm tra mật khẩu
      if (!formRegister.password) {
        newErrorsRegister.password = "Vui lòng nhập mật khẩu";
      } else if (!passwordRegex.test(formRegister.password)) {
        newErrorsRegister.password = "Mật khẩu phải có ít nhất 8 ký tự";
      }
      if (formRegister.password !== confirmPassword) {
        newErrorsRegister.confirmPassword = "Mật khẩu xác nhận không khớp";
      }
      return newErrorsRegister;
    }
  };

  const checkValidationLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    onSubmitLogin(e); // Gọi hàm submit nếu hợp lệ
  };

  const checkValidationRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrorsRegister(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setErrorsRegister(validationErrors);
      return;
    }
    setErrorsRegister({});
    onSubmitRegister(e); // Gọi hàm submit nếu hợp lệ
  };

  return (
    <div
      className="auth-modal fixed inset-0 flex items-center justify-center bg-black/40 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal-content bg-white rounded-xl p-6 shadow-xl w-[90%] max-w-lg relative">
        <button
          className="close-button absolute right-4 top-4 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <X />
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">
          {isLogin ? "Đăng nhập" : "Đăng ký"}
        </h2>

        <form
          className="auth-form grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={isLogin ? checkValidationLogin : checkValidationRegister}
        >
          {/* Họ - Tên */}
          {!isLogin && (
            <>
              <div className="form-group flex flex-col">
                <label className="font-medium mb-1">Họ</label>
                <input
                  type="text"
                  placeholder="Nhập họ"
                  value={formRegister.firstName}
                  onChange={onChangeRegister}
                  name="firstName"
                  className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
                {errorsRegister.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errorsRegister.firstName}
                  </p>
                )}
              </div>
              <div className="form-group flex flex-col">
                <label className="font-medium mb-1">Tên</label>
                <input
                  type="text"
                  placeholder="Nhập tên"
                  value={formRegister.lastName}
                  onChange={onChangeRegister}
                  name="lastName"
                  required
                  className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {errorsRegister.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errorsRegister.lastName}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Ngày sinh */}
          {!isLogin && (
            <div className="form-group flex flex-col">
              <label className="font-medium mb-1">Ngày sinh</label>
              <input
                type="date"
                placeholder="Nhập ngày sinh"
                value={formRegister.birthday}
                onChange={onChangeRegister}
                name="birthday"
                className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              {errorsRegister.birthday && (
                <p className="text-red-500 text-sm mt-1">
                  {errorsRegister.birthday}
                </p>
              )}
            </div>
          )}

          {/* Số điện thoại */}
          <div
            className={`form-group flex flex-col ${
              !isLogin ? "col-span-2" : ""
            }`}
          >
            <label className="font-medium mb-1">Số điện thoại</label>
            <input
              type="text"
              placeholder="Nhập số điện thoại"
              value={isLogin ? formLogin.phoneNumber : formRegister.phoneNumber}
              onChange={isLogin ? onChange : onChangeRegister}
              name="phoneNumber"
              required
              autoComplete="tel"
              className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {isLogin
              ? errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber}
                  </p>
                )
              : errorsRegister.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errorsRegister.phoneNumber}
                  </p>
                )}
          </div>

          {/* Email */}
          {!isLogin && (
            <div className="form-group flex flex-col">
              <label className="font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Nhập email (tuỳ chọn)"
                value={formRegister.email}
                onChange={onChangeRegister}
                name="email"
                autoComplete="email"
                className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errorsRegister.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errorsRegister.email}
                </p>
              )}
            </div>
          )}

          {/* Mật khẩu */}
          <div className="form-group flex flex-col">
            <label className="font-medium mb-1">Mật khẩu</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              value={isLogin ? formLogin.password : formRegister.password}
              onChange={isLogin ? onChange : onChangeRegister}
              name="password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            {isLogin
              ? errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )
              : errorsRegister.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errorsRegister.password}
                  </p>
                )}
          </div>

          {/* Xác nhận mật khẩu */}
          {!isLogin && (
            <div className="form-group flex flex-col">
              <label className="font-medium mb-1">Xác nhận mật khẩu</label>
              <input
                type="password"
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                name="confirm-password"
                className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              {errorsRegister.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errorsRegister.confirmPassword}
                </p>
              )}
            </div>
          )}

          {/* Nút submit */}
          <button
            type="submit"
            className="submit-btn col-span-1 md:col-span-2 bg-blue-600 text-white py-2.5 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            {isLogin ? "Đăng nhập" : "Đăng ký"}
          </button>
        </form>

        <div className="auth-footer text-center mt-4 text-gray-600 text-sm">
          {isLogin ? (
            <p>
              Chưa có tài khoản?{" "}
              <span
                onClick={onToggleMode}
                className="text-blue-600 font-semibold cursor-pointer hover:underline"
              >
                Đăng ký ngay
              </span>
            </p>
          ) : (
            <p>
              Đã có tài khoản?{" "}
              <span
                onClick={onToggleMode}
                className="text-blue-600 font-semibold cursor-pointer hover:underline"
              >
                Đăng nhập
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
