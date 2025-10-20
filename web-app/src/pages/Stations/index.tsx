import { useState, useEffect } from "react";
import { QuickStats } from "@/components/common/QuickStats";
import { StationMap } from "@/components/Stations/StationMap";
import { RecentSwaps } from "@/components/common/RecentSwaps";
import "@/styles/Stations.css";

export const Stations = () => {
  const [stats, setStats] = useState({
    totalStations: 0,
    availableBatteries: 0,
    activeSwaps: 0,
    totalUsers: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalStations: 25,
        availableBatteries: 156,
        activeSwaps: 8,
        totalUsers: 1247,
      });
      setLoading(false);
    }, 1500);
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
      {/* Header với gradient */}
      <div className="stations-header">
        <h1>EV Battery Swap Dashboard</h1>
        <p>Monitor and manage all battery swap stations in real-time</p>

        {/* Quick Stats */}
        <div className="stats-section">
          <QuickStats stats={stats} />
        </div>

        {/* Action Buttons */}
        <div className="stations-actions">
          <button className="action-btn primary">
            <span>📊</span>
            Generate Report
          </button>
          <button className="action-btn secondary">
            <span>➕</span>
            Add New Station
          </button>
          <button className="action-btn primary">
            <span>🔄</span>
            Refresh Data
          </button>
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
              <div className="map-features">
                <div className="feature">📍 25 Active Stations</div>
                <div className="feature">🔋 156 Available Batteries</div>
                <div className="feature">👥 1,247 Registered Users</div>
              </div>
            </div>
          </div>
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
