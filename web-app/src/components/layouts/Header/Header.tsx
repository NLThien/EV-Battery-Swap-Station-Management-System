import { Link } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  onAuthClick: (isLogin: boolean) => void;
}

export const Header = ({ onAuthClick }: HeaderProps) => {
  return (
    <header className="main-header">
      <div className="header-brand">
        <Link to="/" className="brand-link">
          <div className="logo">🔋</div>
          <span>EV Battery Swap</span>
        </Link>
      </div>
      
      <nav className="header-nav">
        <a href="#features">Tính năng</a>
        <Link to="/about">Giới thiệu</Link>
        <Link to="/stations">Chi tiết trạm</Link>
      </nav>

      <div className="header-auth">
        <button 
          className="auth-btn login-btn"
          onClick={() => onAuthClick(true)}
        >
          Đăng nhập
        </button>
        <button 
          className="auth-btn register-btn"
          onClick={() => onAuthClick(false)}
        >
          Đăng ký
        </button>
      </div>
    </header>
  );
};