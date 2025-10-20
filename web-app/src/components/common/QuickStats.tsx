import "./QuickStats.css";

interface Stats {
  totalStations: number;
  availableBatteries: number;
  activeSwaps: number;
  totalUsers: number;
  averageChargingTime: number
}

interface QuickStatsProps {
  stats: Stats;
}

var fullSlotStaions = 2; // Số trạm đầy pin cố định, sau có hàm cập nhật từ API

export const QuickStats = ({ stats }: QuickStatsProps) => {
  return (
    <div className="quick-stats">
      <div className="stats-header">
        <h3>📊 Thống Kê Trong Ngày</h3>
      </div>

      <div className="quick-stats-content">
        <div className="stat-item">
          <span className="stat-lable">Tổng số trạm</span>
          <span className="stat-number">{stats.totalStations} Trạm</span>
        </div>

        <div className="stat-item">
          <span className="stat-lable">Số trạm full</span>
          <span className="stat-number">{stats.totalStations - fullSlotStaions} Trạm</span>
        </div>

        <div className="stat-item">
          <span className="stat-lable">Số pin hoạt động</span>
          <span className="stat-number">{stats.availableBatteries} Pin</span>
        </div>

        <div className="stat-item">
          <span className="stat-lable">Số lượt đổi</span>
          <span className="stat-number">{stats.activeSwaps} Lượt</span>
        </div>

        <div className="stat-item">
          <span className="stat-lable">Thời gian sạc trung bình</span>
          <span className="stat-number">{stats.averageChargingTime} Phút</span>
        </div>

        <div className="stat-item">
          <span className="stat-lable">Tổng số người dùng</span>
          <span className="stat-number">{stats.totalUsers} Người dùng</span>
        </div>
      </div>
    </div>
  );
};