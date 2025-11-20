import { type Station } from '../../types/station';
import './StationStats.css';

// Định nghĩa props interface
interface StationStatsProps {
  stations: Station[];
}

// Định nghĩa StatCard props interface
interface StatCardProps {
  label: string;
  value: number;
  type: 'total' | 'active' | 'inactive' | 'maintenance';
}

const StatCard = ({ label, value, type }: StatCardProps) => (
  <div className="statCard">
    <div className="statIcon"></div>
    <div className={`statValue ${type}`}>{value}</div>
    <div className="statLabel">{label}</div>
  </div>
);

const StationStats = ({ stations }: StationStatsProps) => {
  const stats = {
    total: stations.length,
    active: stations.filter(s => s.status === 'ACTIVE').length,
    inactive: stations.filter(s => s.status === 'INACTIVE').length,
    maintenance: stations.filter(s => s.status === 'MAINTENANCE').length,
  };

  return (
    <div className="statsGrid">
      <StatCard label="Tổng số trạm" value={stats.total} type="total" />
      <StatCard label="Trạm hoạt động" value={stats.active} type="active" />
      <StatCard label="Trạm dừng hoạt động" value={stats.inactive} type="inactive" />
      <StatCard label="Đang bảo trì" value={stats.maintenance} type="maintenance" />
    </div>
  );
};

export default StationStats;