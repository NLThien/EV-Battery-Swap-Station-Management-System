import type { Battery } from './BatteryInventory';
import '../styles/stations.css';

export const BatteryCard = ({ battery }: { battery: Battery }) => {
  return (
    <div className={`battery-card status-${battery.status.toLowerCase()}`}>
      <h3>{battery.model}</h3>
      <p><strong>ID:</strong> {battery.id}</p>
      <p><strong>Capacity:</strong> {battery.capacity}</p>
      <p><strong>Status:</strong> {battery.status}</p>
      <p><strong>Health:</strong> {battery.health}%</p>
    </div>
  );
};
