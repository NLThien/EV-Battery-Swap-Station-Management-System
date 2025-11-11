import { X } from "lucide-react";
import "./AuthModal.css";

import type { LoginRequest } from "@/api/authentication/login";

interface AuthModalProps {
  isOpen: boolean;
  isLogin: boolean;
  formLogin: LoginRequest;
  onClose: () => void;
  onToggleMode: () => void;
  onSubmitLogin: (e: React.FormEvent) => void;
  onSubmitRegister: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
}: AuthModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="auth-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal-content">
        <button className="close-button " onClick={onClose}>
          <X />
        </button>

        <h2>{isLogin ? "Đăng nhập" : "Đăng ký"}</h2>

        <form
          className="auth-form"
          onSubmit={isLogin ? onSubmitLogin : onSubmitRegister}
        >
          {!isLogin && (
            <div className="form-group">
              <label>Họ và tên</label>
              <input type="text" placeholder="Nhập họ và tên" />
            </div>
          )}
          {/* chỗ này là form đăng nhập */}
          <div className="form-group">
            <label>Số điện thoại</label>
            <input
              type="text"
              placeholder="Nhập số điện thoại"
              value={formLogin.phoneNumber}
              onChange={onChange}
              name="phoneNumber"
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              value={formLogin.password}
              onChange={onChange}
              name="password"
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Xác nhận mật khẩu</label>
              <input type="password" placeholder="Nhập lại mật khẩu" />
            </div>
          )}

          <button type="submit" className="submit-btn">
            {isLogin ? "Đăng nhập" : "Đăng ký"}
          </button>
        </form>

        <div className="auth-footer">
          {isLogin ? (
            <p>
              Chưa có tài khoản?{" "}
              <span onClick={onToggleMode}>Đăng ký ngay</span>
            </p>
          ) : (
            <p>
              Đã có tài khoản? <span onClick={onToggleMode}>Đăng nhập</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
