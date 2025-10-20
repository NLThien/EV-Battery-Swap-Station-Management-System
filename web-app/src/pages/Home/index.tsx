import { useState } from "react";
import { Link } from "react-router-dom";

import { AuthModal } from "../../components/AuthModal/AuthModal";
import About from "../About/About";
import "../../styles/Home.css";

const Home = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  // const handleAuthClick = (isLoginMode: boolean) => {
  //   setIsLogin(isLoginMode);
  //   setShowAuthModal(true);
  // };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý login/register
    setShowAuthModal(false);
    // navigate('/stations'); // Tạm comment nếu chưa cần
  };

  const handleToggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  // Xử lý hash khi load trang
  if (window.location.hash) {
    const elementId = window.location.hash.replace("#", "");
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }

  return (
    <div className="home-page">
      <main className="home-main">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>Hệ Thống Trao Đổi Pin Xe Điện Thông Minh</h1>

            <p className="hero-subtitle">
              Giải pháp trao đổi pin nhanh chóng, tiện lợi cho xe điện. Trải
              nghiệm dịch vụ đột phá với công nghệ hiện đại.
            </p>

            <div className="hero-stats">
              <div className="stat">
                <h3>50+</h3>
                <p>Trạm swap</p>
              </div>

              <div className="stat">
                <h3>10,000+</h3>
                <p>Người dùng</p>
              </div>

              <div className="stat">
                <h3>2 phút</h3>
                <p>Thời gian swap</p>
              </div>
            </div>

            <Link to="/stations" className="cta-button">
              Khám phá trạm ngay →
            </Link>
          </div>

          <div className="hero-visual-homepage">
            <div className="battery-animation">
              <div className="battery">🔋</div>
              <div className="swap-arrow">⇄</div>
              <div className="battery charged">🔋</div>
            </div>
          </div>
        </section>

        {/* Tính năng nổi bật */}
        <section id="features" className="features-section">
          <h2>Tính Năng Nổi Bật</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Swap Nhanh Chóng</h3>
              <p>Thay pin chỉ trong 2 phút, tiết kiệm thời gian chờ sạc</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🗺️</div>
              <h3>Định Vị Trạm</h3>
              <p>Tìm trạm swap gần nhất với bản đồ trực quan</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>App Di Động</h3>
              <p>Quản lý và đặt lịch swap qua ứng dụng di động</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Bảo Mật</h3>
              <p>Hệ thống xác thực và bảo mật đa lớp</p>
            </div>
          </div>
        </section>

        {/* Cách thức hoạt động */}
        <section className="how-it-works">
          <h2>Cách Thức Hoạt Động</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Tìm Trạm</h3>
              <p>Tìm trạm swap gần bạn qua app hoặc website</p>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <h3>Đến Trạm</h3>
              <p>Đến trạm và quét mã QR để xác thực</p>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <h3>Trao Đổi Pin</h3>
              <p>Thay pin cũ lấy pin mới đã được sạc đầy</p>
            </div>

            <div className="step">
              <div className="step-number">4</div>
              <h3>Tiếp Tục Hành Trình</h3>
              <p>Thanh toán và tiếp tục di chuyển</p>
            </div>
          </div>
        </section>

        <div id="about">
          <About />
        </div>
      </main>

      <AuthModal
        isOpen={showAuthModal}
        isLogin={isLogin}
        onClose={() => setShowAuthModal(false)}
        onToggleMode={handleToggleAuthMode}
        onSubmit={handleAuthSubmit}
      />
    </div>
  );
};

export default Home;
