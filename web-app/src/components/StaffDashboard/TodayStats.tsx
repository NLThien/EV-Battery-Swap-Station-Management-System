// thống kê hôm nay
import './TodayStats.css';

interface TodayStatsData {
  totalSessions: number;
  totalRevenue: string;
  averageTime: string;
  peakHour: string;
  batterySwaps: number;
  customerSatisfaction: number;
}

interface TodayStatsProps {
  data?: TodayStatsData;
}

export const TodayStats = ({ data }: TodayStatsProps) => {
  const statsData: TodayStatsData = data || {
    totalSessions: 24,
    totalRevenue: '1.850.000 VND',
    averageTime: '42 phút',
    peakHour: '12:00-14:00',
    batterySwaps: 8,
    customerSatisfaction: 4.7
  };

  const stats = [
    {
      icon: '⚡',
      label: 'Lượt sạc',
      value: statsData.totalSessions,
      change: '+12%',
      trend: 'up' as const,
      color: 'var(--primary-color)'
    },
    {
      icon: '💰',
      label: 'Doanh thu',
      value: statsData.totalRevenue,
      change: '+8%',
      trend: 'up' as const,
      color: 'var(--success-color)'
    },
    {
      icon: '⏱️',
      label: 'Thời gian TB',
      value: statsData.averageTime,
      change: '-5%',
      trend: 'down' as const,
      color: 'var(--warning-color)'
    },
    {
      icon: '🔋',
      label: 'Đổi pin',
      value: statsData.batterySwaps,
      change: '+15%',
      trend: 'up' as const,
      color: 'var(--info-color)'
    },
    {
      icon: '⭐',
      label: 'Đánh giá',
      value: `${statsData.customerSatisfaction}/5.0`,
      change: '+0.2',
      trend: 'up' as const,
      color: 'var(--purple-color)'
    },
    {
      icon: '📊',
      label: 'Giờ cao điểm',
      value: statsData.peakHour,
      change: '',
      trend: 'neutral' as const,
      color: 'var(--text-secondary)'
    }
  ];

  return (
    <div className="today-stats">
      <div className="section-header">
        <h3>Thống Kê Hôm Nay</h3>
        <div className="date-info">
          {new Date().toLocaleDateString('vi-VN', { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-header">
              <div 
                className="stat-icon"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                {stat.icon}
              </div>
              <div className="stat-trend">
                {stat.change && (
                  <span className={`trend ${stat.trend}`}>
                    {stat.trend === 'up' ? '↗' : stat.trend === 'down' ? '↘' : '→'} {stat.change}
                  </span>
                )}
              </div>
            </div>
            
            <div className="stat-value" style={{ color: stat.color }}>
              {stat.value}
            </div>
            
            <div className="stat-label">{stat.label}</div>
            
            {stat.trend !== 'neutral' && (
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: stat.trend === 'up' ? '75%' : '60%',
                    background: stat.color
                  }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="performance-summary">
        <h4>Tóm Tắt Hiệu Suất</h4>
        <div className="summary-items">
          <div className="summary-item positive">
            <span className="label">Hoàn thành mục tiêu:</span>
            <span className="value">85%</span>
          </div>
          <div className="summary-item positive">
            <span className="label">Khách hàng hài lòng:</span>
            <span className="value">94%</span>
          </div>
          <div className="summary-item warning">
            <span className="label">Thời gian chờ TB:</span>
            <span className="value">8 phút</span>
          </div>
        </div>
      </div>

      <div className="shift-progress">
        <h4>Tiến Độ Ca Làm</h4>
        <div className="progress-container">
          <div className="progress-info">
            <span>Đã hoàn thành: 6/8 giờ</span>
            <span>75%</span>
          </div>
          <div className="progress-bar large">
            <div 
              className="progress-fill"
              style={{ width: '75%', background: 'var(--primary-gradient)' }}
            ></div>
          </div>
          <div className="time-remaining">
            Còn lại: <strong>2 giờ 15 phút</strong>
          </div>
        </div>
      </div>
    </div>
  );
};