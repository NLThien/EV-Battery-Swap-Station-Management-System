import { Link } from 'react-router-dom';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>EV Battery Swap</h3>
          <p>Giải pháp trao đổi pin thông minh cho tương lai di chuyển xanh</p>
        </div>
        
        <div className="footer-section">
          <h4>Liên kết nhanh</h4>
          <Link to="/">Trang chủ</Link>
          <a href="#features">Tính năng</a>
          <a href="#about">Giới thiệu</a>
          <Link to="/stations">Quản lý trạm</Link>
        </div>
        
        <div className="footer-section">
          <h4>Hỗ trợ</h4>
          <a href="/help">Trung tâm trợ giúp</a>
          <a href="/contact">Liên hệ</a>
          <a href="/privacy">Chính sách bảo mật</a>
          <a href="/terms">Điều khoản sử dụng</a>
        </div>
        
        <div className="footer-section">
          <h4>Liên hệ</h4>
          <p>📧 contact@evswap.com</p>
          <p>📞 0123456789</p>
          <p>📍 Trảng Bom, Ấp Bịp, Xã Mìn, HCM</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 EV Battery Swap. All rights reserved.</p>
        <div className="social-links">
          <a href="#" aria-label="Facebook">📘</a>
          <a href="#" aria-label="Twitter">🐦</a>
          <a href="#" aria-label="LinkedIn">💼</a>
        </div>
      </div>
    </footer>
  );
};