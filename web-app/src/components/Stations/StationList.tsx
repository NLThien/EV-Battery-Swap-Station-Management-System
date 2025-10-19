import { StationCard } from './StationCard';
import './StationList.css';

const mockStations = [
  {
    id: '1',
    name: 'Trạm Quận 1',
    address: '123 Nguyễn Huệ, Quận 1, HCM',
    phone: '0123 456 789',
    operatingHours: '6:00 - 22:00',
    status: 'active' as const,
    availableBatteries: 15,
    totalBatteries: 20
  },
  {
    id: '2',
    name: 'Trạm Quận 2', 
    address: '456 Nguyễn Thị Minh Khai, Quận 2, HCM',
    operatingHours: '24/7',
    status: 'maintenance' as const,
    availableBatteries: 8,
    totalBatteries: 15
  }
];

export const StationList = () => {
  const handleStationSelect = (station: any) => {
    console.log('Selected station:', station);
    // Xử lý khi chọn trạm
  };

  return (
    <div>
      <h2>Battery Swap Stations</h2>
      {mockStations.map(station => (
        <StationCard 
          key={station.id} 
          station={station} 
          onSelect={handleStationSelect}
        />
      ))}
    </div>
  );
};