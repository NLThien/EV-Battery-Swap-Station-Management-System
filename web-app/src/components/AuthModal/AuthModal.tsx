import { X } from "lucide-react";
import "./AuthModal.css";

interface AuthModalProps {
  isOpen: boolean;
  isLogin: boolean;
  onClose: () => void;
  onToggleMode: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const AuthModal = ({
  isOpen,
  isLogin,
  onClose,
  onToggleMode,
  onSubmit,
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

        <form className="auth-form" onSubmit={onSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Họ và tên</label>
              <input type="text" placeholder="Nhập họ và tên" />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Nhập email" />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input type="password" placeholder="Nhập mật khẩu" />
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
