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
            <div key={detail.id} className="station-item">
              <div className="station-info">
                <div className="station-name">
                  {getStatusIcon(status)} 
                  {stationInfo?.name || `Trạm ${detail.stationId}`}
                </div>
                <div className="station-id">
                  {detail.stationId}
                  {stationInfo && (
                    <div className="station-address">
                      {stationInfo.address}
                    </div>
                  )}
                </div>
              </div>
              <div className="station-stats">
                <div className="capacity">Dung lượng: {capacity}</div>
                <div className="load">Tải: {latestLog?.powerDemand || 0} kW</div>
                <div className="slots">Slot: {detail.availableSlots}/{detail.totalSlots}</div>
                {stationInfo && (
                  <div className="station-status-badge">
                    Trạng thái: {stationInfo.status}
                  </div>
                )}
                {latestLog && (
                  <div className="energy">Năng lượng: {latestLog.energyConsumed} kWh</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};