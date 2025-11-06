import './AlertsPanel.css';

export const AlertsPanel = () => {
  const alerts = [
    { 
      id: 1, 
      type: 'warning', 
      message: 'Nhiệt độ cao tại trạm Q1 Center', 
      time: '10 phút trước',
      station: 'ST001'
    },
    { 
      id: 2, 
      type: 'error', 
      message: 'Mất kết nối trạm Thu Duc', 
      time: '25 phút trước',
      station: 'ST004'
    },
    { 
      id: 3, 
      type: 'info', 
      message: 'Bảo trì định kỳ trạm Q7 Riverside', 
      time: '1 giờ trước',
      station: 'ST003'
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return '⚠️';
      case 'error': return '🚨';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  };

  return (
    <div className="alerts-panel">
      <div className="alerts-header">
        <h3>Cảnh Báo</h3>
        <span className="alerts-count">{alerts.length} cảnh báo</span>
      </div>
      
      <div className="alerts-list">
        {alerts.map(alert => (
          <div key={alert.id} className={`alert-item ${alert.type}`}>
            <div className="alert-icon">{getAlertIcon(alert.type)}</div>
            <div className="alert-content">
              <div className="alert-message">{alert.message}</div>
              <div className="alert-meta">
                <span className="alert-station">{alert.station}</span>
                <span className="alert-time">{alert.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};