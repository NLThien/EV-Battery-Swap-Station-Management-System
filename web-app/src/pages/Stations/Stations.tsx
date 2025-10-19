import { useState, useEffect } from 'react';
import { QuickStats } from '@/components/common/QuickStats';
import { StationMap } from '@/components/Stations/StationMap';
import { RecentSwaps } from '@/components/common/RecentSwaps';
import BatteryInventory from '../../components/Stations/BatteryInventory';
import SwapTransactions from '../../components/Stations/SwapTransactions';
import '../../styles/Stations.css';

export const Stations = () => {
  const [stats, setStats] = useState({
    totalStations: 0,
    availableBatteries: 0,
    activeSwaps: 0,
    totalUsers: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Giả lập fetch dashboard stats từ API
    setTimeout(() => {
      setStats({
        totalStations: 25,
        availableBatteries: 156,
        activeSwaps: 8,
        totalUsers: 1247
      });
      setLoading(false);
    }, 1200);
  }, []);

  if (loading) {
    return (
      <div className="stations-loading">
        <div className="loading-spinner"></div>
        <p>Loading stations data...</p>
      </div>
    );
  }

  return (
    <div className="stations-page">
      {/* Header */}
      <div className="stations-header">
        <h1>EV Battery Swap Dashboard</h1>
        <p>Monitor and manage all battery swap stations in real-time</p>

        <div className="stats-section">
          <QuickStats stats={stats} />
        </div>

        <div className="stations-actions">
          <button className="action-btn primary">📊 Generate Report</button>
          <button className="action-btn secondary">➕ Add New Station</button>
          <button className="action-btn primary">🔄 Refresh Data</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="stations-content">
        {/* Map Section */}
        <div className="map-section">
          <h2>Station Locations</h2>
          <div className="map-container">
            <div className="map-placeholder">
              <h3>Interactive Station Map</h3>
              <StationMap />
              <p>Real-time visualization of all battery swap stations</p>
            </div>
          </div>
        </div>

        {/* Inventory Management */}
        <div className="inventory-section">
          <h2>🔋 Battery Inventory Management</h2>
          <BatteryInventory />
        </div>

        {/* Swap Transaction Management */}
        <div className="transactions-section">
          <h2>🔁 Swap Transaction Management</h2>
          <SwapTransactions />
        </div>

        {/* Recent Activity */}
        <div className="recent-activity">
          <h2>Recent Swaps</h2>
          <RecentSwaps />
        </div>
      </div>
    </div>
  );
};

export default Stations;
