// Thông tin nhân viên và trạng thái làm việc
import './StaffHeader.css';

interface StaffHeaderProps {
  staffName?: string;
  stationName?: string;
  shift?: string;
  status?: 'active' | 'break' | 'offline';
}

export const StaffHeader = ({ 
  staffName = "Nguyễn Văn A", 
  stationName = "Trạm Q1 Center",
  shift = "Ca sáng (06:00 - 14:00)",
  status = "active"
}: StaffHeaderProps) => {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'var(--success-color)';
      case 'break': return 'var(--warning-color)';
      case 'offline': return 'var(--error-color)';
      default: return 'var(--text-tertiary)';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'active': return '🟢 Đang làm việc';
      case 'break': return '🟡 Đang nghỉ';
      case 'offline': return '🔴 Offline';
      default: return '⚪ Không xác định';
    }
  };

  return (
    <div className="staff-header">
      <div className="staff-info">
        <div className="staff-avatar">
          {staffName.charAt(0)}
        </div>
        <div className="staff-details">
          <h1>Xin chào, {staffName}!</h1>
          <div className="staff-meta">
            <span className="station">{stationName}</span>
            <span className="shift">{shift}</span>
            <span 
              className="status"
              style={{ color: getStatusColor(status) }}
            >
              {getStatusText(status)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="header-actions">
        <button className="btn-status">
          {status === 'active' ? 'Bắt đầu nghỉ' : 'Kết thúc nghỉ'}
        </button>
        <button className="btn-help">🆘 Hỗ trợ</button>
      </div>
    </div>
  );
};