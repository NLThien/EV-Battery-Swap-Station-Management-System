import React from 'react';
import './BatteryAnalytics.css';

interface BatteryAnalyticsProps {
  currentFilters: {
    dateRange: {
      start: string;
      end: string;
    };
    station: string;
  };
}

const BatteryAnalytics: React.FC<BatteryAnalyticsProps> = ({ currentFilters }) => {
  return (
    <div className="battery-analytics">
      <h2>Phân tích Hiệu suất Pin</h2>
      <div className="analytics-content">
        <p>Đang hiển thị dữ liệu từ: {currentFilters.dateRange.start} đến {currentFilters.dateRange.end}</p>
        <p>Trạm: {currentFilters.station || 'Tất cả'}</p>
        
        <div className="metrics-grid">
          <div className="metric-card">
            <h3>Dung lượng trung bình</h3>
            <div className="metric-value">85%</div>
          </div>
          <div className="metric-card">
            <h3>Số lần sạc</h3>
            <div className="metric-value">1,247</div>
          </div>
          <div className="metric-card">
            <h3>Thời gian sạc TB</h3>
            <div className="metric-value">45 phút</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatteryAnalytics;