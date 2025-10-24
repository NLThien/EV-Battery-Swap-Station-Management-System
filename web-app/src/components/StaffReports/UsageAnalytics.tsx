import React from 'react';
import './UsageAnalytics.css';

interface UsageAnalyticsProps {
  currentFilters: {
    dateRange: {
      start: string;
      end: string;
    };
    station: string;
  };
}

const UsageAnalytics: React.FC<UsageAnalyticsProps> = ({ currentFilters }) => {
  return (
    <div className="usage-analytics">
      <h2>Phân tích Sử dụng</h2>
      <div className="analytics-content">
        <p>Dữ liệu sử dụng từ: {currentFilters.dateRange.start} đến {currentFilters.dateRange.end}</p>
        {/* Thêm nội dung thực tế */}
      </div>
    </div>
  );
};

export default UsageAnalytics;