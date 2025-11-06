import './StationStatus.css';

export const StationStatus = () => {
  const stations = [
    { id: 'ST001', name: 'Trạm Q1 Center', status: 'online', capacity: '85%', currentLoad: '45 kW' },
    { id: 'ST002', name: 'Trạm Q2 Techpark', status: 'online', capacity: '92%', currentLoad: '38 kW' },
    { id: 'ST003', name: 'Trạm Q7 Riverside', status: 'maintenance', capacity: '60%', currentLoad: '0 kW' },
    { id: 'ST004', name: 'Trạm Thu Duc', status: 'offline', capacity: '78%', currentLoad: '0 kW' },
    { id: 'ST005', name: 'Trạm Binh Thanh', status: 'online', capacity: '88%', currentLoad: '52 kW' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return '🟢';
      case 'maintenance': return '🟡';
      case 'offline': return '🔴';
      default: return '⚪';
    }
  };

  return (
    <div className="station-status">
      <div className="status-header">
        <h3>Trạng Thái Trạm</h3>
        <div className="status-summary">
          <span className="online-count">3 Online</span>
          <span className="offline-count">1 Offline</span>
        </div>
      </div>
      
      <div className="stations-list">
        {stations.map(station => (
          <div key={station.id} className="station-item">
            <div className="station-info">
              <div className="station-name">
                {getStatusIcon(station.status)} {station.name}
              </div>
              <div className="station-id">{station.id}</div>
            </div>
            <div className="station-stats">
              <div className="capacity">Dung lượng: {station.capacity}</div>
              <div className="load">Tải: {station.currentLoad}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};