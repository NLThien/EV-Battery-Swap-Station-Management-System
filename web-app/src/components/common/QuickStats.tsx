interface Stats {
  totalStations: number;
  availableBatteries: number;
  activeSwaps: number;
  totalUsers: number;
}

interface QuickStatsProps {
  stats: Stats;
}

export const QuickStats = ({ stats }: QuickStatsProps) => {
  return (
    <div className="quick-stats">
      <div className="stat-item">
        <h3>Total Stations</h3>
        <p className="stat-number">{stats.totalStations}</p>
      </div>
      <div className="stat-item">
        <h3>Available Batteries</h3>
        <p className="stat-number">{stats.availableBatteries}</p>
      </div>
      <div className="stat-item">
        <h3>Active Swaps</h3>
        <p className="stat-number">{stats.activeSwaps}</p>
      </div>
      <div className="stat-item">
        <h3>Total Users</h3>
        <p className="stat-number">{stats.totalUsers}</p>
      </div>
    </div>
  );
};