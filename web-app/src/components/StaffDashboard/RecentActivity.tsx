// Hoạt động gần đây
import './RecentActivity.css';

interface Activity {
  id: string;
  type: 'charge_start' | 'charge_end' | 'battery_swap' | 'maintenance' | 'payment' | 'alert';
  user: string;
  description: string;
  time: string;
  status: 'success' | 'warning' | 'error' | 'info';
  amount?: string;
}

interface RecentActivityProps {
  activities?: Activity[];
}

export const RecentActivity = ({ activities }: RecentActivityProps) => {
  const activityData: Activity[] = activities || [
    {
      id: 'ACT001',
      type: 'charge_start',
      user: 'Nguyễn Văn A',
      description: 'Bắt đầu phiên sạc',
      time: '2 phút trước',
      status: 'success',
      amount: '85.000 VND'
    },
    {
      id: 'ACT002',
      type: 'battery_swap',
      user: 'Trần Thị B',
      description: 'Đổi pin thành công',
      time: '15 phút trước',
      status: 'success',
      amount: '120.000 VND'
    },
    {
      id: 'ACT003',
      type: 'payment',
      user: 'Lê Văn C',
      description: 'Thanh toán thành công',
      time: '25 phút trước',
      status: 'success',
      amount: '65.000 VND'
    },
    {
      id: 'ACT004',
      type: 'maintenance',
      user: 'Nhân viên',
      description: 'Bảo trì pin BAT005',
      time: '1 giờ trước',
      status: 'info'
    },
    {
      id: 'ACT005',
      type: 'charge_end',
      user: 'Phạm Thị D',
      description: 'Kết thúc phiên sạc',
      time: '1 giờ trước',
      status: 'success',
      amount: '95.000 VND'
    },
    {
      id: 'ACT006',
      type: 'alert',
      user: 'Hệ thống',
      description: 'Nhiệt độ cao tại trạm',
      time: '2 giờ trước',
      status: 'warning'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'charge_start': return '⚡';
      case 'charge_end': return '✅';
      case 'battery_swap': return '🔋';
      case 'maintenance': return '🔧';
      case 'payment': return '💰';
      case 'alert': return '🚨';
      default: return '📝';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'success': return 'var(--success-color)';
      case 'warning': return 'var(--warning-color)';
      case 'error': return 'var(--error-color)';
      case 'info': return 'var(--info-color)';
      default: return 'var(--text-tertiary)';
    }
  };

  const getTypeText = (type: string) => {
    switch(type) {
      case 'charge_start': return 'Bắt đầu sạc';
      case 'charge_end': return 'Kết thúc sạc';
      case 'battery_swap': return 'Đổi pin';
      case 'maintenance': return 'Bảo trì';
      case 'payment': return 'Thanh toán';
      case 'alert': return 'Cảnh báo';
      default: return 'Hoạt động';
    }
  };

  return (
    <div className="recent-activity">
      <div className="section-header">
        <h3>Hoạt Động Gần Đây</h3>
        <button className="btn-text">Xem tất cả →</button>
      </div>

      <div className="activity-filters">
        <div className="filter-buttons">
          <button className="filter-btn active">Tất cả</button>
          <button className="filter-btn">Sạc</button>
          <button className="filter-btn">Thanh toán</button>
          <button className="filter-btn">Cảnh báo</button>
        </div>
      </div>

      <div className="activities-list">
        {activityData.map(activity => (
          <div key={activity.id} className="activity-item">
            <div 
              className="activity-icon"
              style={{ backgroundColor: `${getStatusColor(activity.status)}20` }}
            >
              {getActivityIcon(activity.type)}
            </div>
            
            <div className="activity-content">
              <div className="activity-header">
                <div className="activity-info">
                  <span className="activity-type">{getTypeText(activity.type)}</span>
                  <span className="activity-user">{activity.user}</span>
                </div>
                <div className="activity-meta">
                  <span className="activity-time">{activity.time}</span>
                  {activity.amount && (
                    <span className="activity-amount">{activity.amount}</span>
                  )}
                </div>
              </div>
              
              <div className="activity-description">
                {activity.description}
              </div>
              
              <div 
                className="activity-status"
                style={{ color: getStatusColor(activity.status) }}
              >
                {activity.status === 'success' && 'Thành công'}
                {activity.status === 'warning' && 'Cảnh báo'}
                {activity.status === 'error' && 'Lỗi'}
                {activity.status === 'info' && 'Thông tin'}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="activity-summary">
        <div className="summary-card">
          <div className="summary-value">{activityData.length}</div>
          <div className="summary-label">Hoạt động hôm nay</div>
        </div>
        <div className="summary-card">
          <div className="summary-value">
            {activityData.filter(a => a.status === 'success').length}
          </div>
          <div className="summary-label">Thành công</div>
        </div>
        <div className="summary-card">
          <div className="summary-value">
            {activityData.filter(a => a.type === 'payment').length}
          </div>
          <div className="summary-label">Giao dịch</div>
        </div>
      </div>
    </div>
  );
};