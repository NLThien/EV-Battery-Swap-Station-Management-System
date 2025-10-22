import React from 'react';
import './FinancialReport.css';

interface FinancialReportProps {
  currentFilters: {
    dateRange: {
      start: string;
      end: string;
    };
    station: string;
  };
}

const FinancialReport: React.FC<FinancialReportProps> = ({ currentFilters }) => {
  return (
    <div className="financial-report">
      <h2>Báo cáo Tài chính</h2>
      <div className="report-content">
        <p>Báo cáo tài chính từ: {currentFilters.dateRange.start} đến {currentFilters.dateRange.end}</p>
        {/* Thêm nội dung thực tế */}
      </div>
    </div>
  );
};

export default FinancialReport;