// Phiên sạc hiện tại của khách hàng
import './CurrentSession.css';

interface Session {
  id: string;
  customer: string;
  startTime: string;
  duration: string;
  battery: string;
  energy: string;
  status: 'charging' | 'waiting' | 'completed';
  progress: number;
}

interface CurrentSessionProps {
  sessions?: Session[];
}

export const CurrentSession = ({ sessions }: CurrentSessionProps) => {
  const currentSessions: Session[] = sessions || [
    {
      id: 'SESS001',
      customer: 'Trần Thị B',
      startTime: '13:15',
      duration: '30 phút',
      battery: 'BAT001',
      energy: '2.1 kWh',
      status: 'charging',
      progress: 65
    },
    {
      id: 'SESS002',
      customer: 'Lê Văn C',
      startTime: '12:45',
      duration: 'Đang sạc',
      battery: 'BAT006',
      energy: '1.8 kWh',
      status: 'charging',
      progress: 45
    }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'charging': return 'var(--warning-color)';
      case 'waiting': return 'var(--info-color)';
      case 'completed': return 'var(--success-color)';
      default: return 'var(--text-tertiary)';
    }
  };

  return (
    <div className="current-session">
      <div className="section-header">
        <h3>Phiên Sạc Hiện Tại</h3>
        <span className="session-count">{currentSessions.length} phiên đang hoạt động</span>
      </div>

      <div className="sessions-list">
        {currentSessions.map(session => (
          <div key={session.id} className="session-card">
            <div className="session-header">
              <div className="customer-info">
                <div className="customer-avatar">
                  {session.customer.charAt(0)}
                </div>
                <div className="customer-details">
                  <div className="customer-name">{session.customer}</div>
                  <div className="session-time">
                    Bắt đầu: {session.startTime} • {session.duration}
                  </div>
                </div>
              </div>
              <div 
                className="session-status"
                style={{ color: getStatusColor(session.status) }}
              >
                {session.status === 'charging' ? '🔄 Đang sạc' : '⏳ Chờ'}
              </div>
            </div>

            <div className="session-progress">
              <div className="progress-info">
                <span>Tiến độ: {session.progress}%</span>
                <span>Pin: {session.battery}</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${session.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="session-details">
              <div className="detail-item">
                <span className="label">Năng lượng:</span>
                <span className="value">{session.energy}</span>
              </div>
              <div className="detail-item">
                <span className="label">Thời gian còn:</span>
                <span className="value">~15 phút</span>
              </div>
            </div>

            <div className="session-actions">
              <button className="btn-small primary">Tạm dừng</button>
              <button className="btn-small secondary">Chi tiết</button>
              <button className="btn-small warning">Kết thúc</button>
            </div>
          </div>
        ))}
      </div>

      {currentSessions.length === 0 && (
        <div className="no-sessions">
          <div className="no-sessions-icon">🔌</div>
          <p>Không có phiên sạc nào đang hoạt động</p>
          <button className="btn-primary">Bắt đầu phiên sạc mới</button>
        </div>
      )}
    </div>
  );
};