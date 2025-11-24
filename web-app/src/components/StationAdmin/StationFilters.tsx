import { useState } from 'react';
import './StationFilters.css';

// Định nghĩa props interface
interface StationFiltersProps {
  onSearch: (filters: { name?: string; status?: string }) => void;
  onClear: () => void;
}

// Định nghĩa filters interface
interface Filters {
  name: string;
  status: string;
}

const StationFilters = ({ onSearch, onClear }: StationFiltersProps) => {
  const [filters, setFilters] = useState<Filters>({
    name: '',
    status: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const searchFilters: { name?: string; status?: string } = {};
    if (filters.name.trim()) searchFilters.name = filters.name.trim();
    if (filters.status) searchFilters.status = filters.status;
    
    onSearch(searchFilters);
  };

  const handleClear = () => {
    setFilters({ name: '', status: '' });
    onClear();
  };

  // Hàm lấy class cho select theo status
  const getSelectClass = (status: string) => {
    if (!status) return 'filterSelectField';
    
    switch (status) {
      case 'ACTIVE': return 'filterSelectField status-active';
      case 'INACTIVE': return 'filterSelectField status-inactive';
      case 'MAINTENANCE': return 'filterSelectField status-maintenance';
      default: return 'filterSelectField';
    }
  };

  return (
    <div className="filters">
      <h3>Tìm kiếm trạm</h3>
      <form onSubmit={handleSubmit} className="filterForm">
        <div className="filterInput">
          <input
            type="text"
            name="name"
            value={filters.name}
            onChange={handleChange}
            placeholder="Tìm kiếm tên trạm..."
            className="filterInputField"
          />
        </div>
        
        <div className="filterSelect">
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className={getSelectClass(filters.status)}
          >
            <option value="">Tất cả trạng thái</option>
            <option value="ACTIVE" className="option-active">Hoạt động</option>
            <option value="INACTIVE" className="option-inactive">Ngưng hoạt động</option>
            <option value="MAINTENANCE" className="option-maintenance">Bảo trì</option>
          </select>
        </div>

        <div className="filterActions">
          <button
            type="submit"
            className="searchButton"
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="clearButton"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default StationFilters;