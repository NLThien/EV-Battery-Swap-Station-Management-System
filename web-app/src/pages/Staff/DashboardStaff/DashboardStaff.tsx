import './DashboardStaff.css';
import { StaffHeader } from '../../../components/StaffDashboard/StaffHeader';
import { QuickActions } from '../../../components/StaffDashboard/QuickActions';
import { CurrentSession } from '../../../components/StaffDashboard/CurrentSession';
import { BatteryQueue } from '../../../components/StaffDashboard/BatteryQueue';
import { TodayStats } from '../../../components/StaffDashboard/TodayStats';
import { RecentActivity } from '../../../components/StaffDashboard/RecentActivity';

function StaffDashboard() {
  const handleQuickAction = (action: string) => {
    console.log('Quick action:', action);
    // Xử lý các thao tác nhanh
    switch(action) {
      case 'start-charge':
        // Mở modal bắt đầu sạc
        break;
      case 'swap-battery':
        // Mở modal đổi pin
        break;
      case 'maintenance':
        // Chuyển đến trang bảo trì
        break;
      default:
        break;
    }
  };

  return (
    <div className="staff-dashboard">
      <StaffHeader />
      
      <div className="dashboard-content">
        <div className="left-column">
          <QuickActions onAction={handleQuickAction} />
          <CurrentSession />
          <BatteryQueue />
        </div>
        
        <div className="right-column">
          <TodayStats />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}

export default StaffDashboard;