import './StationStatus.css';
import { useStationDetails } from '../../hooks/useStationDetails';
import { useStationEnergyLogs } from '../../hooks/useStationEnergyLogs';
import { useStations } from '../../hooks/useStations';

export const StationStatus = () => {

  const { stationDetails, loading: detailsLoading, error: detailsError } = useStationDetails();
  const { energyLogs, loading: logsLoading, error: logsError } = useStationEnergyLogs();
  const { stations, loading: stationsLoading } = useStations();

  // map icon theo trạng thái lấy được
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return '🟢';
      case 'maintenance': return '🟡';
      case 'offline': return '🔴';
      default: return '⚪';
    }
  };

  // lấy thông tin station từ stations list
  const getStationInfo = (stationId: string) => {
    return stations.find(station => station.id === stationId);
  };

  // lấy thông tin energy log mới nhất cho mỗi trạm
  const getLatestEnergyLog = (stationId: string) => {
    return energyLogs
      .filter(log => log.stationId === stationId)
      .sort((a, b) => new Date(b.loggedAt).getTime() - new Date(a.loggedAt).getTime())[0];
  };

  // lấy trạng thái đăng nhập dựa của trạm
  const calculateStatus = (detail: any) => {
    const latestLog = getLatestEnergyLog(detail.stationId);
    
    if (!latestLog || latestLog.powerDemand === 0) return 'offline';
    if (detail.availableSlots === 0) return 'maintenance';
    return 'online';
  };

  // tính tỉ lệ trống pin tại trạm
  const calculateCapacity = (detail: any) => {
    if (detail.totalSlots === 0) return '0%';
    const capacity = (detail.availableSlots / detail.totalSlots) * 100;
    return `${Math.round(capacity)}%`;
  };

  // tạo loading khi lấy dữ liệu
  if (detailsLoading || logsLoading) {
    return <div className="station-status">Đang tải dữ liệu...</div>;
  }

  // hiển thị lỗi
  if (detailsError || logsError) {
    return <div className="station-status">Lỗi: {detailsError || logsError}</div>;
  }

  // tính các trạm hoạt động
  const onlineCount = stationDetails.filter(detail => 
    calculateStatus(detail) === 'online'
  ).length;
  
  // tính các trạm không hoạt động
  const offlineCount = stationDetails.filter(detail => 
    calculateStatus(detail) === 'offline'
  ).length;

  return (
    <div className="station-status">
      <div className="status-header">
        <h3>Trạng Thái Trạm</h3>
        <div className="status-summary">
          <span className="online-count">{onlineCount} Online</span>
          <span className="offline-count">{offlineCount} Offline</span>
        </div>
      </div>
      
      <div className="stations-list">
        {stationDetails.map(detail => {
          const status = calculateStatus(detail);
          const capacity = calculateCapacity(detail);
          const latestLog = getLatestEnergyLog(detail.stationId);
          const stationInfo = getStationInfo(detail.stationId);
          
          return (
            <div key={detail.id} className={`station-item ${status} ${detailsLoading ? 'loading' : ''}`}>
              <div className="station-info">
                <div className="station-header">
                  <span className="status-icon">{getStatusIcon(status)}</span>
                  <div className="station-name">
                    {stationInfo?.name || `Trạm ${detail.stationId}`}
                  </div>
                </div>
                <div className="station-details">
                  <div className="station-id">{detail.stationId}</div>
                  {stationInfo?.address && (
                    <div className="station-address">{stationInfo.address}</div>
                  )}
                </div>
              </div>
              
              <div className="station-stats">
                <div className="stat-item">
                  <div className="stat-label">Dung lượng</div>
                  <div className="stat-value capacity-value">{capacity}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Tải</div>
                  <div className="stat-value load-value">{latestLog?.powerDemand || 0} kW</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Slot</div>
                  <div className="stat-value slots-value">{detail.availableSlots}/{detail.totalSlots}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Năng lượng</div>
                  <div className="stat-value energy-value">{latestLog?.energyConsumed || 0} kWh</div>
                </div>
                
                {stationInfo && (
                  <div className={`station-status-badge ${stationInfo.status}`}>
                    {stationInfo.status === 'ACTIVE' ? 'Hoạt động' : 
                    stationInfo.status === 'MAINTENANCE' ? 'Bảo trì' : 'Ngừng hoạt động'}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};