import { useState, useEffect } from 'react';
import { Station } from '@/types/station';
import { stationService } from '@/services/api/stations/stationService';

export const StationList = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStations();
  }, []);

  const loadStations = async () => {
    try {
      setLoading(true);
      const data = await stationService.getAllStations();
      setStations(data);
    } catch (err) {
      setError('Không thể tải danh sách trạm');
      console.error('Error loading stations:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Đang tải danh sách trạm...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="station-list">
      <h3>Danh sách trạm ({stations.length})</h3>
      <div className="stations-grid">
        {stations.map((station) => (
          <div key={station.id} className="station-card">
            <div className="station-header">
              <h4>{station.name}</h4>
              <span className={`status-badge ${station.status.toLowerCase()}`}>
                {getStatusText(station.status)}
              </span>
            </div>
            <p className="station-address">{station.address}</p>
            <div className="station-slots">
              <span>Slot: {station.availableSlots}/{station.totalSlots}</span>
            </div>
            <div className="station-coordinates">
              <small>Lat: {station.latitude}, Lng: {station.longitude}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function getStatusText(status: string): string {
  const statusMap: { [key: string]: string } = {
    'ACTIVE': 'Hoạt động',
    'INACTIVE': 'Ngừng hoạt động', 
    'MAINTENANCE': 'Bảo trì'
  };
  return statusMap[status] || status;
}