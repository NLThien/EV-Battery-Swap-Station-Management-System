import { useStationAlerts } from '../../hooks/useStationAlerts';
import { useEffect } from 'react';
import './StationAlertsPanel.css'

interface StationAlertsPanelProps {
  stationId: string;
}

export const StationAlertsPanel = ({ stationId }: StationAlertsPanelProps) => {
  const { 
    alerts, 
    getActiveAlertsByStation,
    acknowledgeAlert, 
    resolveAlert,
    loading, 
    error 
  } = useStationAlerts();

  useEffect(() => {
    if (stationId) {
      getActiveAlertsByStation(stationId);
    }
  }, [stationId]);

  const handleAcknowledge = async (alertId: string) => {
    try {
      await acknowledgeAlert(alertId, 'staff-user-id'); // TODO: Lấy từ auth context sau này
      // Sau khi acknowledge, reload danh sách alerts
      getActiveAlertsByStation(stationId);
    } catch (error) {
      console.error('Error acknowledging alert:', error);
    }
  };

  const handleResolve = async (alertId: string) => {
    try {
      await resolveAlert(alertId, 'staff-user-id', 'Đã xử lý');
      // Sau khi resolve, reload danh sách alerts
      getActiveAlertsByStation(stationId);
    } catch (error) {
      console.error('Error resolving alert:', error);
    }
  };

  const criticalAlerts = alerts.filter(alert => alert.severity === 'CRITICAL');
  const activeAlerts = alerts.filter(alert => alert.status === 'ACTIVE');
  const displayedAlerts = activeAlerts.slice(0, 5);

  // Loading state
  if (loading) {
    return (
      <div className="station-alerts-panel">
        <div className="section-header">
          <h3>🚨 Cảnh báo Trạm</h3>
          <div className="alerts-summary loading">
            <span>Đang tải...</span>
          </div>
        </div>
        <div className="alerts-loading">
          <p>Đang tải danh sách cảnh báo...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="station-alerts-panel">
        <div className="section-header">
          <h3>🚨 Cảnh báo Trạm</h3>
          <div className="alerts-summary error">
            <span>Lỗi tải dữ liệu</span>
          </div>
        </div>
        <div className="alerts-error">
          <p>Không thể tải danh sách cảnh báo</p>
          <small>{error}</small>
        </div>
      </div>
    );
  }

  return (
    <div className="station-alerts-panel">
      <div className="section-header">
        <h3>🚨 Cảnh báo Trạm</h3>
        <div className="alerts-summary">
          {criticalAlerts.length > 0 && (
            <span className="critical-count">{criticalAlerts.length} nghiêm trọng</span>
          )}
          <span className="active-count">{activeAlerts.length} đang hoạt động</span>
          {activeAlerts.length === 0 && (
            <span className="no-alerts">✅ Không có cảnh báo</span>
          )}
        </div>
      </div>

      {displayedAlerts.length > 0 ? (
        <div className="alerts-list">
          {displayedAlerts.map(alert => (
            <div key={alert.id} className={`alert-item ${alert.severity.toLowerCase()}`}>
              <div className="alert-content">
                <div className="alert-message">{alert.description}</div>
                <div className="alert-meta">
                  <span className="alert-type">{alert.alertType}</span>
                  <span className="alert-time">
                    {new Date(alert.createdAt).toLocaleTimeString('vi-VN')}
                  </span>
                </div>
              </div>
              <div className="alert-actions">
                <button 
                  className="btn-small warning"
                  onClick={() => handleAcknowledge(alert.id)}
                  disabled={loading}
                >
                  Đã biết
                </button>
                <button 
                  className="btn-small success"
                  onClick={() => handleResolve(alert.id)}
                  disabled={loading}
                >
                  Giải quyết
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-alerts-message">
          <p>✅ Không có cảnh báo đang hoạt động</p>
          <small>Mọi thứ đều ổn định</small>
        </div>
      )}
    </div>
  );
};