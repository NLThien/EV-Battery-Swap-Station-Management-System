import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>Về Chúng Tôi</h1>
          <p className="hero-subtitle">
            Tiên phong trong giải pháp trao đổi pin xe điện thông minh,
            mang đến trải nghiệm di chuyển xanh cho cộng đồng.
          </p>
        </div>
        <div className="hero-visual">
          <div className="floating-elements">
            <div className="element battery">🔋</div>
            <div className="element car">🚗</div>
            <div className="element station">🏢</div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="container">
          <div className="mission-card">
            <div className="card-icon">🎯</div>
            <h3>Sứ Mệnh</h3>
            <p>
              Cung cấp giải pháp trao đổi pin xe điện nhanh chóng, tiện lợi
              và thân thiện với môi trường, góp phần thúc đẩy quá trình
              chuyển đổi sang giao thông xanh tại Việt Nam.
            </p>
          </div>
          <div className="vision-card">
            <div className="card-icon">🔭</div>
            <h3>Tầm Nhìn</h3>
            <p>
              Trở thành hệ thống trao đổi pin xe điện hàng đầu tại Việt Nam,
              với mạng lưới trạm swap phủ rộng khắp các thành phố lớn
              và tỉnh thành trọng điểm.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="our-story">
        <div className="container">
          <h2>Hành Trình Phát Triển</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-year">01/10/2025</div>
              <div className="timeline-content">
                <h4>Thành lập</h4>
                <p>Ra mắt nhóm 5 thằng học UTH bắt đầu triển khai dự án trạm swap đầu tiên tại TP.HCM</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">12/10/2025</div>
              <div className="timeline-content">
                <h4>Mở rộng</h4>
                <p>Phát triển được 1 trạm đổi pin tại TP Hồ Chí Minh</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">17/10/2025</div>
              <div className="timeline-content">
                <h4>Bứt phá</h4>
                <p>Đạt tận 10 người dùng và 50+ lượt đổi trong 1 tháng (nổ đấy làm đã xong đâu :v)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2>Đội Ngũ Của Chúng Tôi</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">👨‍💼</div>
              <h4>Nguyễn Văn Chiến</h4>
              <p className="member-role">CEO & Founder</p>
              <p className="member-desc">
                10+ năm kinh nghiệm trong lĩnh vực năng lượng tái tạo
              </p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👩‍🔧</div>
              <h4>Hồ Ngọc Huy</h4>
              <p className="member-role">CTO</p>
              <p className="member-desc">
                Chuyên gia công nghệ pin và hệ thống sạc
              </p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👨‍💻</div>
              <h4>Nhóm 5 Con Khỉ</h4>
              <p className="member-role">Head of Development</p>
              <p className="member-desc">
                Phát triển phần mềm quản lý trạm swap
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section">
        <div className="container">
          <h2>Giá Trị Cốt Lõi</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h4>Bền Vững</h4>
              <p>Cam kết bảo vệ môi trường và phát triển bền vững</p>
            </div>
            <div className="value-card">
              <div className="value-icon">⚡</div>
              <h4>Đổi Mới</h4>
              <p>Không ngừng sáng tạo và cải tiến công nghệ</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h4>Hợp Tác</h4>
              <p>Đồng hành cùng đối tác và cộng đồng</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💎</div>
              <h4>Chất Lượng</h4>
              <p>Đảm bảo dịch vụ tốt nhất cho khách hàng</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <h2>Sẵn Sàng Trải Nghiệm?</h2>
          <p>Tham gia cùng chúng tôi trong hành trình kiến tạo tương lai di chuyển xanh</p>
          <div className="cta-buttons">
            <button className="cta-btn primary">Đăng Ký Ngay</button>
            <button className="cta-btn secondary">Liên Hệ Tư Vấn</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;