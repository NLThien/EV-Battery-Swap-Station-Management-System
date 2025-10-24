import React from 'react';
import './ReportFilters.css';

// Định nghĩa props interface
interface ReportFiltersProps {
  currentFilters: {
    dateRange: {
      start: string;
      end: string;
    };
    station: string;
    reportType: string;
  };
  onFilterChange: (filters: any) => void;
}

const ReportFilters: React.FC<ReportFiltersProps> = ({ currentFilters, onFilterChange }) => {
  const handleDateChange = (field: 'start' | 'end', value: string) => {
    onFilterChange({
      ...currentFilters,
      dateRange: {
        ...currentFilters.dateRange,
        [field]: value
      }
    });
  };

  const handleStationChange = (value: string) => {
    onFilterChange({
      ...currentFilters,
      station: value
    });
  };

  return (
    <div className="report-filters">
      <h3>Bộ lọc báo cáo</h3>
      <div className="filters-grid">
        <div className="filter-group">
          <label>Ngày bắt đầu</label>
          <input 
            type="date" 
            value={currentFilters.dateRange.start}
            onChange={(e) => handleDateChange('start', e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label>Ngày kết thúc</label>
          <input 
            type="date" 
            value={currentFilters.dateRange.end}
            onChange={(e) => handleDateChange('end', e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label>Trạm sạc</label>
          <select 
            value={currentFilters.station}
            onChange={(e) => handleStationChange(e.target.value)}
          >
            <option value="">Tất cả trạm</option>
            <option value="station1">Trạm 1</option>
            <option value="station2">Trạm 2</option>
            <option value="station3">Trạm 3</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ReportFilters;