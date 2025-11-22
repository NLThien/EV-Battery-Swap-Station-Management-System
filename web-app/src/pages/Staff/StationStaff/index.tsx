//này là quản lí 1 trạm của staff đó như quản lí pin kiểm tra pin
import './StationStaff.css';
import { StationOverview } from '../../../components/StationStaff/StationOverview';
import { StationBatteryManagement } from '../../../components/StationStaff/StationBatteryManagement';
import { StationChargingSessions } from '../../../components/StationStaff/StationChargingSessions';
import { StationAlertsPanel } from '../../../components/StationStaff/StationAlertsPanel';
import { StationEnergyMonitor } from '../../../components/StationStaff/StationEnergyMonitor';
import { StationQuickActions } from '../../../components/StationStaff/StationQuickActions';
import { useStations } from '../../../hooks/useStations';
import { useEffect, useState } from 'react';

function StationStaff() {

  // Sau này sẽ lấy từ AuthContext khi đăng nhập
  // const { user } = useAuth();
  // const currentStationId = user?.stationId;

  // tạm thời để id này để test ui
  const currentStationId = 'station-001';
  const [loadAttempted, setLoadAttempted] = useState(false);
  
  // Chỉ load station info
  const { 
    selectedStation, 
    getStationById,
    loading: stationLoading,
    error: stationError
  } = useStations();

  // Load station info cơ bản
  useEffect(() => {
    const loadStationInfo = async () => {
      try {
        setLoadAttempted(true);
        console.log('Đang load trạm:', currentStationId);
        await getStationById(currentStationId);
      } catch (error) {
        console.error('Không thấy thông tin trạm:', error);
      }
    };
    
    if (currentStationId) {
      loadStationInfo();
    }
  }, [currentStationId]);

  const loading = stationLoading;
  const hasErrors = stationError;

  // Nếu chưa có stationId
  if (!currentStationId) {
    return (
      <div className="station-staff-error">
        <h2>⚠️ Không có trạm được phân công</h2>
        <p>Tài khoản của bạn chưa được phân công quản lý trạm nào.</p>
      </div>
    );
  }

  // Hiển thị loading
  if (loading) {
    return (
      <div className="station-staff-loading">
        <div className="loading-spinner"></div>
        <p>Đang tải thông tin trạm...</p>
        <small>Station ID: {currentStationId}</small>
      </div>
    );
  }

  // Hiển thị lỗi
  if (loadAttempted && hasErrors) {
    return (
      <div className="station-staff-error">
        <h2>❌ Lỗi kết nối dịch vụ</h2>
        <p>Không thể tải thông tin trạm từ server.</p>
        <div className="error-details">
          {stationError && <p>Lỗi: {stationError}</p>}
        </div>
      </div>
    );
  }

  // Hiển thị nếu không tìm thấy trạm
  if (loadAttempted && !selectedStation) {
    return (
      <div className="station-staff-error">
        <h2>🚫 Không tìm thấy trạm</h2>
        <p>Trạm <strong>{currentStationId}</strong> không tồn tại trong hệ thống.</p>
      </div>
    );
  }

  if (!selectedStation) {
    return (
      <div className="station-staff-loading">
        <div className="loading-spinner"></div>
        <p>Đang chờ thông tin trạm từ API...</p>
      </div>
    );
  }

return (
    <div className="station-staff">
      <div className="station-header">
        <div className="station-info">
          <h1>{selectedStation.name}</h1>
          <div className="station-meta">
            <span className="station-id">ID: {selectedStation.id}</span>
            <span className={`station-status ${selectedStation.status.toLowerCase()}`}>
              {selectedStation.status === 'ACTIVE' ? '🟢 Đang hoạt động' : 
               selectedStation.status === 'MAINTENANCE' ? '🟡 Bảo trì' : '🔴 Ngừng hoạt động'}
            </span>
            <span className="station-address">📍 {selectedStation.address}</span>
          </div>
        </div>
        <StationQuickActions station={selectedStation} />
      </div>

      <div className="station-layout-grid">
        
        <div className="station-row-1">
          <StationOverview 
            stationId={currentStationId}
            station={selectedStation}
          />
        </div>

        <div className="station-row-2">
          <StationBatteryManagement 
            stationId={currentStationId}
          />
        </div>

        <div className="station-row-3">
          <StationChargingSessions 
            stationId={currentStationId}
          />
        </div>

        <div className="station-row-4">
          <StationAlertsPanel 
            stationId={currentStationId}
          />
          <StationEnergyMonitor 
            stationId={currentStationId}
          />
        </div>
      </div>
    </div>
  );
}

export default StationStaff;