// Hang đợi pin và trạng thái pin trong trạm
import './BatteryQueue.css';

interface Battery {
  id: string;
  level: number;
  status: 'available' | 'charging' | 'maintenance' | 'low';
  health: number;
  queue: number;
}

interface BatteryQueueProps {
  batteries?: Battery[];
}

export const BatteryQueue = ({ batteries }: BatteryQueueProps) => {
  const batteryData: Battery[] = batteries || [
    { id: 'BAT001', level: 85, status: 'available', health: 95, queue: 1 },
    { id: 'BAT002', level: 92, status: 'charging', health: 98, queue: 2 },
    { id: 'BAT003', level: 45, status: 'available', health: 88, queue: 3 },
    { id: 'BAT004', level: 100, status: 'available', health: 92, queue: 4 },
    { id: 'BAT005', level: 78, status: 'maintenance', health: 85, queue: -1 },
    { id: 'BAT006', level: 25, status: 'low', health: 90, queue: 5 }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'available': return 'var(--success-color)';
      case 'charging': return 'var(--warning-color)';
      case 'maintenance': return 'var(--error-color)';
      case 'low': return 'var(--error-color)';
      default: return 'var(--text-tertiary)';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'available': return 'Sẵn sàng';
      case 'charging': return 'Đang sạc';
      case 'maintenance': return 'Bảo trì';
      case 'low': return 'Pin yếu';
      default: return 'Không xác định';
    }
  };

  const availableBatteries = batteryData.filter(b => b.status === 'available');
  const chargingBatteries = batteryData.filter(b => b.status === 'charging');

  return (
    <div className="battery-queue">
      <div className="section-header">
        <h3>Hàng Đợi Pin</h3>
        <div className="battery-summary">
          <span className="available">{availableBatteries.length} sẵn sàng</span>
          <span className="charging">{chargingBatteries.length} đang sạc</span>
        </div>
      </div>

      <div className="queue-stats">
        <div className="stat-card">
          <div className="stat-value">{availableBatteries.length}</div>
          <div className="stat-label">Pin sẵn sàng</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{chargingBatteries.length}</div>
          <div className="stat-label">Đang sạc</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {Math.round(availableBatteries.reduce((acc, b) => acc + b.level, 0) / availableBatteries.length)}%
          </div>
          <div className="stat-label">Mức trung bình</div>
        </div>
      </div>

      <div className="batteries-list">
        {batteryData.map(battery => (
          <div key={battery.id} className={`battery-item ${battery.status}`}>
            <div className="battery-main">
              <div className="battery-info">
                <span className="battery-id">{battery.id}</span>
                <span 
                  className="battery-status"
                  style={{ color: getStatusColor(battery.status) }}
                >
                  {getStatusText(battery.status)}
                </span>
              </div>
              
              <div className="battery-level-container">
                <div 
                  className="battery-level"
                  style={{ 
                    width: `${battery.level}%`,
                    background: getStatusColor(battery.status)
                  }}
                />
              </div>
              
              <div className="battery-details">
                <span className="level">{battery.level}%</span>
                <span className="health">Sức khoẻ: {battery.health}%</span>
              </div>
            </div>

            {battery.queue > 0 && (
              <div className="queue-number">
                #{battery.queue}
              </div>
            )}

            <div className="battery-actions">
              {battery.status === 'available' && (
                <button className="btn-small primary">Sử dụng</button>
              )}
              {battery.status === 'charging' && (
                <button className="btn-small warning">Theo dõi</button>
              )}
              {battery.status === 'maintenance' && (
                <button className="btn-small error">Sửa chữa</button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="queue-actions">
        <button className="btn-primary">Sắp xếp lại hàng đợi</button>
        <button className="btn-secondary">Thêm pin mới</button>
      </div>
    </div>
  );
};