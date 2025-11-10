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
      <StatCard label="Total Stations" value={stats.total} type="total" />
      <StatCard label="Active Stations" value={stats.active} type="active" />
      <StatCard label="Inactive Stations" value={stats.inactive} type="inactive" />
      <StatCard label="Under Maintenance" value={stats.maintenance} type="maintenance" />
    </div>
  );
};

export default StationStats;