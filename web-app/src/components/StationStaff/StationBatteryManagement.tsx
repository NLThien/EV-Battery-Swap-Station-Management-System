import { useState, useEffect } from 'react';
import './StationBatteryManagement.css';

interface StationBatteryManagementProps {
  stationId: string;
}

export const StationBatteryManagement = ({ stationId }: StationBatteryManagementProps) => {
  const [batteries, setBatteries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // TODO: Kết nối với service pin của trạm này
  useEffect(() => {
    const loadStationBatteries = async () => {
      try {
        setLoading(true);
        // Gọi API: GET /api/stations/{stationId}/batteries
        const mockBatteries = [
          { id: 'BAT001', level: 85, status: 'available', health: 95, temperature: 32 },
          { id: 'BAT002', level: 92, status: 'charging', health: 98, temperature: 28 },
          { id: 'BAT003', level: 45, status: 'available', health: 88, temperature: 30 },
          { id: 'BAT004', level: 100, status: 'available', health: 92, temperature: 25 },
          { id: 'BAT005', level: 78, status: 'maintenance', health: 85, temperature: 35 },
        ];
        setBatteries(mockBatteries);
      } catch (error) {
        console.error('Error loading station batteries:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStationBatteries();
  }, [stationId]);

  const handleBatteryAction = async (batteryId: string, action: string) => {
    try {
      // TODO: Gọi API tương ứng
      console.log(`${action} battery ${batteryId} at station ${stationId}`);
      
      // Cập nhật UI ngay lập tức (optimistic update)
      setBatteries(prev => prev.map(battery => 
        battery.id === batteryId 
          ? { ...battery, status: action === 'use' ? 'in_use' : battery.status }
          : battery
      ));
    } catch (error) {
      console.error('Error performing battery action:', error);
    }
  };

  // ... rest of the component (giữ nguyên các hàm helper và UI)
  
  return (
    <div className="station-battery-management">
      <div className="section-header">
        <h3>🔋 Pin của Trạm</h3>
        <div className="battery-summary">
          <span className="total">{batteries.length} pin</span>
          <span className="available">
            {batteries.filter(b => b.status === 'available').length} sẵn sàng
          </span>
        </div>
      </div>

      {/* UI giữ nguyên */}
      {/* ... */}
    </div>
  );
};