import { useEffect, useState } from 'react';
import { getAllBatteries } from '../../services/stations/batteryService';
import { BatteryCard } from './BatteryCard';

export type Battery = {
  id: string;
  model: string;
  capacity: string;
  status: 'Full' | 'Charging' | 'Maintenance';
  health: number;
};

const BatteryInventory = () => {
  const [batteries, setBatteries] = useState<Battery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBatteries() {
      try {
        const data = await getAllBatteries();
        setBatteries(
          data.map((b: any) => ({
            ...b,
            status: b.status as 'Full' | 'Charging' | 'Maintenance',
          }))
        );
      } catch (error) {
        console.error('Error fetching batteries:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchBatteries();
  }, []);

  if (loading) return <p>Loading battery inventory...</p>;

  return (
    <div className="battery-inventory">
      <div className="battery-grid">
        {batteries.map((b) => (
          <BatteryCard key={b.id} battery={b} />
        ))}
      </div>
    </div>
  );
};

export default BatteryInventory;
