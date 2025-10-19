import { useEffect, useState } from 'react';
import { getAllBatteries } from '../../services/stations/batteryService';


export type Battery = {
  id: string;
  model: string;
  capacity: string;
  chargeLevel: number;
  status: 'Full' | 'Charging' | 'Maintenance' | 'InUse' | 'Damaged';
  health: number;
  station_id: string;
};

const BatteryInventory = () => {
  const [batteries, setBatteries] = useState<Battery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBatteries() {
      try {
        const data = await getAllBatteries();
        setBatteries(data);
      } catch (error) {
        console.error('Error fetching batteries:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchBatteries();
  }, []);

  if (loading)
  return (
    <div className="loading-section">
      <div className="loading-spinner"></div>
      <p>Loading battery inventory...</p>
    </div>
  );

  return (
    <div className="battery-inventory-page">
      <h2>Battery Inventory Management</h2>

      <table className="battery-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Model</th>
            <th>Capacity</th>
            <th>Charge Level (%)</th>
            <th>Health (%)</th>
            <th>Status</th>
            <th>Station</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(batteries) && batteries.length > 0 ? (
            batteries.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.model}</td>
                <td>{b.capacity}</td>
                <td>{b.chargeLevel}%</td>
                <td>{b.health}%</td>
                <td className={`status-${b.status.toLowerCase()}`}>{b.status}</td>
                <td>{b.station_id}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No batteries found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BatteryInventory;
