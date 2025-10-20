import './OverviewCards.css';

export const OverviewCards = () => {
  const stats = [
    {
      title: 'Tổng Trạm',
      value: '48',
      subtitle: 'Đang hoạt động',
      trend: '+12%',
      color: 'var(--primary-color)'
    },
    {
      title: 'Đang Sạc',
      value: '156',
      subtitle: 'Xe đang sạc',
      trend: '+8%',
      color: 'var(--success-color)'
    },
    {
      title: 'Công Suất',
      value: '2.4 MW',
      subtitle: 'Đang sử dụng',
      trend: '+15%',
      color: 'var(--warning-color)'
    },
    {
      title: 'Hiệu Suất',
      value: '94%',
      subtitle: 'Trung bình',
      trend: '+2%',
      color: 'var(--info-color)'
    }
  ];

  return (
    <div className="overview-cards">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-header">
            <h3>{stat.title}</h3>
            <span className="trend" style={{ color: stat.color }}>
              {stat.trend}
            </span>
          </div>
          <div className="stat-value" style={{ color: stat.color }}>
            {stat.value}
          </div>
          <div className="stat-subtitle">{stat.subtitle}</div>
        </div>
      ))}
    </div>
  );
};