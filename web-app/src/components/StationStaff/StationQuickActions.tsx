import './StationQuickActions.css';

interface StationQuickActionsProps {
  station: any;
}

export const StationQuickActions = ({ station }: StationQuickActionsProps) => {
  const handleQuickAction = async (action: string) => {
    try {
      switch(action) {
        case 'maintenance':
          console.log('Chuyển trạng thái bảo trì:', station.id);
          break;
          
        case 'shutdown':
          if (window.confirm('Bạn có chắc muốn tạm dừng trạm này?')) {
            console.log('Tạm dừng trạm:', station.id);
          }
          break;
          
        case 'restart':
          console.log('Khởi động lại trạm:', station.id);
          break;
          
        case 'report':
          console.log('Tạo báo cáo trạm:', station.id);
          break;
          
        case 'refresh':
          window.location.reload();
          break;
          
        default:
          break;
      }
    } catch (error) {
      console.error('Error performing quick action:', error);
    }
  };

  const isActive = station.status === 'ACTIVE';
  const isMaintenance = station.status === 'MAINTENANCE';

  return (
    <div className="station-quick-actions">
      {isActive && (
        <>
          <button 
            className="action-btn warning"
            onClick={() => handleQuickAction('maintenance')}
            title="Chuyển sang chế độ bảo trì"
          >
            Bảo trì
          </button>
          <button 
            className="action-btn error"
            onClick={() => handleQuickAction('shutdown')}
            title="Tạm dừng trạm"
          >
            Tạm dừng
          </button>
        </>
      )}
      
      {isMaintenance && (
        <button 
          className="action-btn success"
          onClick={() => handleQuickAction('restart')}
          title="Khởi động lại trạm"
        >
          Khởi động
        </button>
      )}
      
      <button 
        className="action-btn secondary"
        onClick={() => handleQuickAction('refresh')}
        title="Làm mới dữ liệu"
      >
        Làm mới
      </button>
    </div>
  );
};