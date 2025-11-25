import './AlertsPanel.css';
import { useStationAlerts } from '../../hooks/useStationAlerts';
import { useAlertStats } from '../../hooks/useStationAlerts';
import { useState, useEffect } from 'react';
import { formatTimeAgo } from '../../utils/formatTimeAgo'

export const AlertsPanel = () => {
  const { 
    alerts, loading, error, fetchAlerts, acknowledgeAlert, resolveAlert
  } = useStationAlerts({ isActive: true }); // lấy các cảnh báo hoạt động

  const { stats } = useAlertStats(alerts);
  const [localLoading, setLocalLoading] = useState(false);

  // Map severity để hiển thị
  const getAlertTypeFromSeverity = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
      case 'HIGH':
        return 'error';
      case 'MEDIUM':
        return 'warning';
      case 'LOW':
      default:
        return 'info';
    }
  };

  // Map alert type sang string
  const getAlertMessage = (alert: any) => {
    const stationName = alert.station?.name || `Trạm ${alert.stationId}`;
    
    switch (alert.alertType) {
      case 'MAINTENANCE':
        return `Bảo trì định kỳ tại ${stationName}`;
      case 'PERFORMANCE':
        if (alert.metricName && alert.currentValue && alert.thresholdValue) {
          return `Hiệu suất ${alert.metricName} vượt ngưỡng tại ${stationName} (${alert.currentValue} ${alert.unit || ''} > ${alert.thresholdValue} ${alert.unit || ''})`;
        }
        return `Sự cố hiệu suất tại ${stationName}`;
      case 'SAFETY':
        return `Cảnh báo an toàn tại ${stationName}`;
      case 'POWER':
        return `Sự cố nguồn điện tại ${stationName}`;
      case 'NETWORK':
        return `Mất kết nối tại ${stationName}`;
      case 'BATTERY':
        return `Cảnh báo pin tại ${stationName}`;
      default:
        return alert.title || `Cảnh báo tại ${stationName}`;
    }
  };

  // map type alerts sang icon
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return '⚠️';
      case 'error': return '🚨';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  };

  // Xử lý xác nhận alert(cảnh báo)
  const handleAcknowledge = async (alertId: string) => {
    setLocalLoading(true);
    try {
      await acknowledgeAlert(alertId, 'user');
      await fetchAlerts();
    } catch (err) {
      console.error('Failed to acknowledge alert:', err);
    } finally {
      setLocalLoading(false);
    }
  };

    // Xử lý alert
  const handleResolve = async (alertId: string) => {
    setLocalLoading(true);
    try {
      await resolveAlert(alertId, 'user');
      await fetchAlerts(); // Refresh danh sách
    } catch (err) {
      console.error('Failed to resolve alert:', err);
    } finally {
      setLocalLoading(false);
    }
  };

    // Refresh alerts mỗi 30 giây để cập nhật liên tục
  useEffect(() => {
    const interval = setInterval(() => {
      fetchAlerts();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchAlerts]);

  if (loading) {
    return (
      <div className="alerts-panel">
        <div className="alerts-header">
          <h3>Cảnh Báo</h3>
          <span className="alerts-count">Đang tải...</span>
        </div>
        <div className="alerts-loading">Đang tải cảnh báo...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alerts-panel">
        <div className="alerts-header">
          <h3>Cảnh Báo</h3>
          <span className="alerts-count">Lỗi</span>
        </div>
        <div className="alerts-error">
          <div>❌ Lỗi khi tải cảnh báo</div>
          <button onClick={fetchAlerts} className="retry-button">
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="alerts-panel">
      <div className="alerts-header">
        <h3>Cảnh Báo</h3>
          <span className={`alerts-count ${stats.critical > 0 ? 'has-critical' : ''}`}>
            {stats.active} cảnh báo đang active
            {stats.critical > 0 && ` (${stats.critical} critical)`}
          </span>
      </div>
      
      <div className="alerts-list">
        {alerts.length === 0 ? (
          <div className="no-alerts">
            <div className="no-alerts-icon">✅</div>
            <div className="no-alerts-message">Không có cảnh báo nào</div>
            <div className="no-alerts-sub">Tất cả hệ thống đang hoạt động bình thường</div>
          </div>
        ) : (
          alerts.map(alert => {
            const displayType = getAlertTypeFromSeverity(alert.severity);
            const displayMessage = getAlertMessage(alert);
            const stationCode = alert.stationId;
            
            return (
              <div key={alert.id} className={`alert-item ${displayType}`}>
                <div className="alert-icon">{getAlertIcon(displayType)}</div>
                <div className="alert-content">
                  <div className="alert-message">{displayMessage}</div>
                  <div className="alert-meta">
                    <span className="alert-station">{stationCode}</span>
                    <span className="alert-time">
                      {formatTimeAgo(alert.triggeredAt)}
                    </span>
                  </div>
                  <div className="alert-actions">
                    {alert.status === 'ACTIVE' && (
                      <>
                        <button 
                          onClick={() => handleAcknowledge(alert.id)}
                          disabled={localLoading}
                          className="alert-action-btn acknowledge-btn"
                        >
                          Đã biết
                        </button>
                        <button 
                          onClick={() => handleResolve(alert.id)}
                          disabled={localLoading}
                          className="alert-action-btn resolve-btn"
                        >
                          Giải quyết
                        </button>
                      </>
                    )}
                    {alert.status === 'ACKNOWLEDGED' && (
                      <button 
                        onClick={() => handleResolve(alert.id)}
                        disabled={localLoading}
                        className="alert-action-btn resolve-btn"
                      >
                        Giải quyết
                      </button>
                    )}
                    {alert.status === 'RESOLVED' && (
                      <span className="alert-resolved">Đã giải quyết</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};