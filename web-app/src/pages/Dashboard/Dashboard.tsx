import { useState, useEffect } from 'react';
import { QuickStats } from '@/components/common/QuickStats';
import { StationMap } from '@/components/Stations/StationMap';
import { RecentSwaps } from '@/components/common/RecentSwaps';

export const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStations: 0,
    availableBatteries: 0,
    activeSwaps: 0,
    totalUsers: 0
  });

  // Mock data tạm thời
  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalStations: 25,
        availableBatteries: 156,
        activeSwaps: 3,
        totalUsers: 1247
      });
    }, 1000);
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>EV Battery Swap Dashboard</h1>
        <QuickStats stats={stats} />
      </div>
      
      <div className="dashboard-content">
        <div className="map-section">
          <StationMap />
        </div>
        
        <div className="recent-activity">
          <RecentSwaps />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;