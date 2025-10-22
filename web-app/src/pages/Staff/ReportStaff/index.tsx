import React, { useState } from 'react';
import ReportFilters from '../../components/StaffReports/ReportFilters';
import BatteryAnalytics from '../../components/StaffReports/BatteryAnalytics';
import UsageAnalytics from '../../components/StaffReports/UsageAnalytics';
import FinancialReport from '../../components/StaffReports/FinancialReport';
import ExportPanel from '../../components/StaffReports/ExportPanel';
import './ReportStaff.css';

// Định nghĩa interface chung cho Filters
interface Filters {
  dateRange: {
    start: string;
    end: string;
  };
  station: string;
  reportType: string;
}

const StaffReports: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    dateRange: { start: '', end: '' },
    station: '',
    reportType: 'battery'
  });

  const [activeTab, setActiveTab] = useState<'battery' | 'usage' | 'financial'>('battery');

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const handleExport = (format: 'pdf' | 'excel' | 'csv') => {
    console.log(`Exporting ${activeTab} report as ${format}`, filters);
    // Thêm logic export thực tế ở đây
  };

  return (
    <div className="staff-reports">
      <div className="reports-header">
        <h1>Báo cáo trạm sạc</h1>
        <p>Theo dõi và phân tích hiệu suất hệ thống</p>
      </div>

      <ReportFilters 
        currentFilters={filters}
        onFilterChange={handleFilterChange}
      />

      <div className="reports-tabs">
        <button 
          className={`tab-button ${activeTab === 'battery' ? 'active' : ''}`}
          onClick={() => setActiveTab('battery')}
        >
          Phân tích Pin
        </button>
        <button 
          className={`tab-button ${activeTab === 'usage' ? 'active' : ''}`}
          onClick={() => setActiveTab('usage')}
        >
          Phân tích Sử dụng
        </button>
        <button 
          className={`tab-button ${activeTab === 'financial' ? 'active' : ''}`}
          onClick={() => setActiveTab('financial')}
        >
          Báo cáo Tài chính
        </button>
      </div>

      <div className="reports-content">
        {activeTab === 'battery' && <BatteryAnalytics currentFilters={filters} />}
        {activeTab === 'usage' && <UsageAnalytics currentFilters={filters} />}
        {activeTab === 'financial' && <FinancialReport currentFilters={filters} />}
      </div>

      <ExportPanel onExportAction={handleExport} />
    </div>
  );
};

export default StaffReports;