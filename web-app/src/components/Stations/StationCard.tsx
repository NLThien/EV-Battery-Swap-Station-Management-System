import React from 'react';
import './StationCard.css';
import { type Station } from '@/types/station';

// nhận dạng props cho StationCard
interface StationCardProps {
  station: Station;
  onSelect: (station: Station) => void;
}

export const StationCard: React.FC<StationCardProps> = ({ station, onSelect }) => {
  // Tính phần trăm pin có sẵn
  const availablePercentage = station.totalSlots > 0 
    ? (station.availableSlots / station.totalSlots) * 100 
    : 0;

  return (
    <div className="station-card" onClick={() => onSelect(station)}>
      <div className="station-header">
        <h3>{station.name}</h3>
        <span className={`status-badge ${station.status}`}>
          {station.status}
        </span>
      </div>
      
      <div className="station-info">
        <p>📍 {station.address}</p>
        {/* <p>📞 {station.phone || 'N/A'}</p>
        <p>⏰ {station.operatingHours}</p> */}
      </div>
      
      <div className="battery-info">
        <div className="battery-stats">
          <span>Available: {station.availableSlots}</span>
          <span>Total: {station.totalSlots}</span>
        </div>
        <div className="battery-level">
          <div 
            className="level-bar"
            style={{ width: `${availablePercentage}%` }}
          />
        </div>
      </div>
      
      <button className="swap-btn" onClick={() => onSelect(station)}>
        Start Swap
      </button>
    </div>
  );
};

// Export default nếu cần
export default StationCard;