import { Link } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  onAuthClick: (isLogin: boolean) => void;
}

export const Header = ({ onAuthClick }: HeaderProps) => {
  const handleNavClick = (sectionId: string) => {
    // Kiểm tra nếu đang ở trang chủ
    if (window.location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Nếu đang ở trang khác, chuyển đến trang chủ với hash
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <header className="main-header">
      <div className="header-brand">
        <Link to="/" className="brand-link">
          <div className="logo">🔋</div>
          <span>EV Battery Swap</span>
        </Link>
      </div>
      
      <nav className="header-nav">
        <button 
          className="nav-link-btn"
          onClick={() => handleNavClick('features')}
        >
          Tính năng
        </button>
        <button 
          className="nav-link-btn"
          onClick={() => handleNavClick('about')}
        >
          Giới thiệu
        </button>
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