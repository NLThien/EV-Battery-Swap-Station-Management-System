import './StationOverview.css';
import { useStationDetails } from '@/hooks/useStationDetails';
import { useEffect } from 'react';

interface StationOverviewProps {
  stationId: string;
  station: any;
}

export const StationOverview = ({ stationId, station }: StationOverviewProps) => {
  const { 
    selectedDetail, 
    getDetailByStationId,
    loading, 
    error 
  } = useStationDetails();

  useEffect(() => {
    if (stationId) {
      getDetailByStationId(stationId);
    }
  }, [stationId]);

  const calculateUtilization = () => {
    if (!selectedDetail?.totalSlots) return 0;
    return Math.round(((selectedDetail.totalSlots - (selectedDetail.availableSlots || 0)) / selectedDetail.totalSlots) * 100);
  };

  // Loading state
  if (loading) {
    return (
      <div className="station-overview">
        <div className="overview-header">
          <h3>🏠 Tổng quan Trạm</h3>
          <div className="loading-badge">Đang tải...</div>
        </div>
        <div className="overview-loading">
          <p>Đang tải thông tin chi tiết trạm...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="station-overview">
        <div className="overview-header">
          <h3>🏠 Tổng quan Trạm</h3>
          <div className="error-badge">Lỗi</div>
        </div>
        <div className="overview-error">
          <p>Không thể tải thông tin chi tiết trạm</p>
          <small>{error}</small>
        </div>
      </div>
    );
  }

  // No data state
  if (!selectedDetail) {
    return (
      <div className="station-overview">
        <div className="overview-header">
          <h3>🏠 Tổng quan Trạm</h3>
          <div className={`status-badge ${station.status.toLowerCase()}`}>
            {station.status === 'ACTIVE' ? '🟢 Đang hoạt động' : 
             station.status === 'MAINTENANCE' ? '🟡 Bảo trì' : '🔴 Ngừng hoạt động'}
          </div>
        </div>
        <div className="overview-no-data">
          <p>Không có dữ liệu chi tiết cho trạm này</p>
        </div>
      </div>
    );
  }

  // Success state - có đầy đủ data
  return (
    <div className="station-overview">
      <div className="overview-header">
        <h3>🏠 Tổng quan Trạm</h3>
        <div className={`status-badge ${station.status.toLowerCase()}`}>
          {station.status === 'ACTIVE' ? '🟢 Đang hoạt động' : 
           station.status === 'MAINTENANCE' ? '🟡 Bảo trì' : '🔴 Ngừng hoạt động'}
        </div>
      </div>

      <div className="overview-stats-grid">
        <div className="stat-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-content">
            <div className="stat-value">{selectedDetail.currentPowerUsage || 0} kW</div>
            <div className="stat-label">Công suất hiện tại</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔌</div>
          <div className="stat-content">
            <div className="stat-value">{selectedDetail.availableSlots || 0}/{selectedDetail.totalSlots || 0}</div>
            <div className="stat-label">Slot khả dụng</div>
            <div className="stat-progress">
              <div 
                className="progress-bar" 
                style={{ width: `${calculateUtilization()}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-value">{calculateUtilization()}%</div>
            <div className="stat-label">Tỷ lệ sử dụng</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🌡️</div>
          <div className="stat-content">
            <div className="stat-value">32°C</div>
            <div className="stat-label">Nhiệt độ trạm</div>
          </div>
        </div>
      </div>

      <div className="station-details">
        <h4>Thông tin chi tiết</h4>
        <div className="details-grid">
          <div className="detail-item">
            <span className="label">📍 Địa chỉ:</span>
            <span className="value">{station.address}</span>
          </div>
          <div className="detail-item">
            <span className="label">👤 Quản lý:</span>
            <span className="value">{station.manager?.name || 'Chưa xác định'}</span>
          </div>
          <div className="detail-item">
            <span className="label">📞 Liên hệ:</span>
            <span className="value">{station.contactPhone || 'N/A'}</span>
          </div>
          <div className="detail-item">
            <span className="label">🕒 Cập nhật:</span>
            <span className="value">
              {station.updatedAt ? new Date(station.updatedAt).toLocaleDateString('vi-VN') : 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};