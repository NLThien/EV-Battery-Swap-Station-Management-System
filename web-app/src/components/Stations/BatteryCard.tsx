import type { Battery } from './BatteryInventory';

export const BatteryCard = ({ battery }: { battery: Battery }) => (
  <div className="battery-card">
    <h4>{battery.id}</h4>
    <p>Model: {battery.model}</p>
    <p>Capacity: {battery.capacity}</p>
    <p>Status: <span className={`status-${battery.status.toLowerCase()}`}>{battery.status}</span></p>
    <p>Health: {battery.health}%</p>
  </div>
);
