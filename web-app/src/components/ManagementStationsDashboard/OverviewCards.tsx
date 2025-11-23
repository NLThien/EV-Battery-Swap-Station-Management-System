import './OverviewCards.css';
import { useOverviewStats } from '../../hooks/stationAdminDashBoard/useOverviewStats';

export const OverviewCards = () => {
  const { stats, loading } = useOverviewStats();

  if (loading) {
    return (
      <div className="overview-cards">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="stat-card loading">
            <div className="stat-header">
              <div className="stat-title skeleton"></div>
              <div className="trend skeleton"></div>
            </div>
            <div className="stat-value skeleton"></div>
            <div className="stat-subtitle skeleton"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="overview-cards">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-header">
            <h3>{stat.title}</h3>
            <span className={`trend ${stat.trend.includes('+') ? 'positive' : 'negative'}`}>
              {stat.trend}
            </span>
          </div>
          <div className="stat-value" style={{ color: stat.color }}>
            {stat.value}
          </div>
          <div className="stat-subtitle">{stat.subtitle}</div>
        </div>
      ))}
    </div>
  );
};