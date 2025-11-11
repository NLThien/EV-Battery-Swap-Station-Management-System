import { useState, useEffect } from 'react';
import { StationCard } from './StationCard';
import { stationService } from '@/services/stations/stationService';
import { type Station } from '@/types/station';
import './StationList.css';

// nhận dạng props
interface StationListProps {
  stations: Station[];
}

// Mock data dự phòng
const mockStations: Station[] = [
  {
    id: '1',
    name: 'Trạm Quận 1 - DEMO',
    address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
    latitude: 10.7757,
    longitude: 106.7004,
    availableSlots: 8,
    totalSlots: 10,
    status: 'ACTIVE',
    managerId: '',
    createdAt: '',
    updatedAt: ''
  },
  {
    id: '2',
    name: 'Trạm Quận 3 - DEMO',
    address: '456 Lý Chính Thắng, Quận 3, TP.HCM',
    latitude: 10.7821,
    longitude: 106.6832,
    availableSlots: 2,
    totalSlots: 10,
    status: 'ACTIVE',
    managerId: '',
    createdAt: '',
    updatedAt: ''
  },
  {
    id: '3',
    name: 'Trạm Quận 10 - DEMO',
    address: '789 Sư Vạn Hạnh, Quận 10, TP.HCM',
    latitude: 10.7769,
    longitude: 106.6671,
    availableSlots: 0,
    totalSlots: 10,
    status: 'MAINTENANCE',    
    managerId: '',
    createdAt: '',
    updatedAt: ''
  },
  {
    id: '4',
    name: 'Trạm Quận 5 - DEMO',
    address: '321 An Dương Vương, Quận 5, TP.HCM',
    latitude: 10.7540,
    longitude: 106.6694,
    availableSlots: 12,
    totalSlots: 15,
    status: 'ACTIVE',
    managerId: '',
    createdAt: '',
    updatedAt: ''
  },
  {
    id: '5',
    name: 'Trạm Quận 7 - DEMO',
    address: '654 Nguyễn Thị Thập, Quận 7, TP.HCM',
    latitude: 10.7340,
    longitude: 106.7218,
    availableSlots: 5,
    totalSlots: 10,
    status: 'ACTIVE',
    managerId: '',
    createdAt: '',
    updatedAt: ''
  }
];

export const StationList = ({stations} : StationListProps) => {

  const handleStationSelect = (station: Station) => {
    console.log('Selected station:', station);
    // Xử lý khi chọn trạm
  };
  // Sử dụng stations từ props, nếu empty thì hiển thị thông báo
  const displayStations = stations.length > 0 ? stations : mockStations;

  return (
 <div className="station-list">
      <div className="station-list-header">
        <h2>Danh Sách Trạm Đổi Pin</h2>
        <div className="station-count">
          Tổng số: {displayStations.length} trạm
        </div>
      </div>

      {displayStations.length === 0 ? (
        <div className="no-stations">
          <p>📭 Không có trạm nào để hiển thị</p>
          <p className="subtext">Hãy kiểm tra kết nối API hoặc thử lại sau</p>
        </div>
      ) : (
        <div className="stations-grid">
          {displayStations.map(station => (
            <StationCard 
              key={station.id} 
              station={station} 
              onSelect={handleStationSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};