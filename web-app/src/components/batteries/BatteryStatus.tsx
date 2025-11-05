import React from 'react';

export interface Battery {
  id: string | number;
  chargeLevel: number;
  status: string;
}

export const BatteryStatus: React.FC<{ battery: Battery }> = ({ battery }) => {
  const getBatteryColor = (level: number) => {
    if (level > 70) return '#4CAF50';
    if (level > 30) return '#FFC107';
    return '#F44336';
  };

  return (
    <div className="battery-status">
      <div className="battery-icon">
        <div 
          className="battery-level"
          style={{ 
            height: `${battery.chargeLevel}%`,
            backgroundColor: getBatteryColor(battery.chargeLevel)
          }}
        />
      </div>
      
      <div className="battery-details">
        <span className="battery-id">ID: {battery.id}</span>
        <span className="charge-level">{battery.chargeLevel}%</span>
        <span className={`status ${battery.status}`}>{battery.status}</span>
      </div>
    </div>
  );
};
