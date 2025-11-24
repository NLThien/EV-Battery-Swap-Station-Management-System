import './EnvironmentalStats.css';
import { useEnvironmentalStats } from '../../hooks/stationAdminDashBoard/useEnvironmentalStats';
import { formatTimeAgo } from '../../utils/formatTimeAgo';

export const EnvironmentalStats = () => {
  const { stats, loading, error, refetch, lastUpdated, totalEnergyLogs } = useEnvironmentalStats();

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      default: return '➡️';
    }
  };

  const getTrendClass = (trend?: string) => {
    switch (trend) {
      case 'up': return 'trend-up';
      case 'down': return 'trend-down';
      default: return 'trend-neutral';
    }
  };

    if (loading) {
    return (
      <div className="environmental-stats">
        <h3>Tác Động Môi Trường</h3>
        <div className="env-grid">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="env-card loading">
              <div className="env-icon skeleton"></div>
              <div className="env-content">
                <div className="env-value skeleton"></div>
                <div className="env-title skeleton"></div>
                <div className="env-subtitle skeleton"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="environmental-stats">
        <h3>Tác Động Môi Trường</h3>
        <div className="env-error">
          <div className="error-icon">⚠️</div>
          <div className="error-message">{error}</div>
          <button onClick={refetch} className="retry-btn">
            Thử lại
          </button>
        </div>
      </div>
    );
  }

return (
    <div className="environmental-stats">
      <div className="env-header">
        <div className="env-title-section">
          <h3>Tác Động Môi Trường</h3>
          {lastUpdated && (
            <div className="last-updated">
              Cập nhật: {formatTimeAgo(lastUpdated.toString())}
            </div>
          )}
        </div>
        <div className="env-actions">
          <div className="data-count">
            {totalEnergyLogs} bản ghi
          </div>
          <button onClick={refetch} className="refresh-btn" title="Làm mới dữ liệu">
            🔄
          </button>
        </div>
      </div>
      
      <div className="env-grid">
        {stats.map((item, index) => (
          <div key={index} className="env-card">
            <div className="env-icon">{item.icon}</div>
            <div className="env-content">
              <div className="env-value-wrapper">
                <div className="env-value">{item.value}</div>
                {item.change && (
                  <div className={`env-change ${getTrendClass(item.trend)}`}>
                    <span className="trend-icon">{getTrendIcon(item.trend)}</span>
                    {item.change}
                  </div>
                )}
              </div>
              <div className="env-title">{item.title}</div>
              <div className="env-subtitle">{item.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};