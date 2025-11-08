import './StationMap.css';
import { useState, useEffect } from 'react';
import { type Station } from '../../types/station';
import { stationService } from '../../services/stations/stationService';

// Import Leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// nhận dạng props
interface StationMapProps {
  stations: Station[];
}

// Fix icon cho Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});
  // Dữ liệu demo trạm (nếu không có dữ liệu thật)
  const demoStations: Station[] = [
    {
      id: 'demo-1',
      name: 'Trạm Quận 1 - DEMO',
      address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
      latitude: 10.7757,
      longitude: 106.7004,
      availableSlots: 8,
      totalSlots: 10,
      status: 'ACTIVE',
      managerId: 'Đỗ Hữu Đạo',
      createdAt: '',
      updatedAt: ''
    },
    {
      id: 'demo-2',
      name: 'Trạm Quận 3 - DEMO',
      address: '456 Lý Chính Thắng, Quận 3, TP.HCM',
      latitude: 10.7821,
      longitude: 106.6832,
      availableSlots: 2,
      totalSlots: 10,
      status: 'ACTIVE',
      managerId: 'Nguyễn Sơn Hoàng',
      createdAt: '',
      updatedAt: ''
    },
    {
      id: 'demo-3',
      name: 'Trạm Quận 10 - DEMO',
      address: '789 Sư Vạn Hạnh, Quận 10, TP.HCM',
      latitude: 10.7769,
      longitude: 106.6671,
      availableSlots: 0,
      totalSlots: 10,
      status: 'MAINTENANCE',
      managerId: 'Hồ Ngọc Huy',
      createdAt: '',
      updatedAt: ''
    },

    {
      id: 'demo-1',
      name: 'Trạm Demo Quận Thủ Đức',
      address: '123 Võ Văn Ngân, Thủ Đức, TP.HCM',
      latitude: 10.7757,
      longitude: 106.7204,
      availableSlots: 8,
      totalSlots: 10,
      status: 'ACTIVE',
      managerId: 'Nguyễn Hoàng Phúc',
      createdAt: '',
      updatedAt: ''
    },

    {
      id: 'demo-2',
      name: 'Trạm Demo Quận 12', 
      address: '455 QL22, Quận 12, TP.HCM',
      latitude: 10.7831,
      longitude: 106.7032,
      availableSlots: 2,
      totalSlots: 10,
      status: 'ACTIVE',
      managerId: 'Nguyễn Lâm Thiên',
      createdAt: '',
      updatedAt: ''
    }
  ];

export const StationMap = ({ stations }: StationMapProps) => {

  // Tọa độ mặc định (TP.HCM)
  const defaultCenter: [number, number] = [10.762622, 106.660172];
  const defaultZoom = 13;

  // Sử dụng stations từ props, nếu empty thì dùng demo
  const displayStations = stations.length > 0 ? stations : demoStations;

  // Tạo icon tùy chỉnh cho trạm
  const createStationIcon = (station: Station) => {
    let color = 'gray';
    let text = '0';
    
    if (station.status === 'ACTIVE') {
      if (station.availableSlots > 5) {
        color = '#22c55e'; // xanh lá
      } else if (station.availableSlots > 0) {
        color = '#f59e0b'; // cam
      } else {
        color = '#ef4444'; // đỏ
      }
      text = station.availableSlots.toString();
    } else if (station.status === 'MAINTENANCE') {
      color = '#6b7280'; // xám
      text = '⚒️';
    }

    return L.divIcon({
      className: 'custom-station-icon',
      html: `
        <div style="
          background-color: ${color};
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 12px;
          cursor: pointer;
        ">${text}</div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  };

  return (
    <div className="station-map">
      {stations.length === 0 && (
        <div className="map-warning">
          ⚠️ Bản đồ không thể tải. Vui lòng chờ kiếp sau
        </div>
      )}
      
      <div className="map-station-container">
        <MapContainer
          center={defaultCenter}
          zoom={defaultZoom}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          {/* Tile Layer - OpenStreetMap (miễn phí) */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Hiển thị các trạm trên map */}
          {displayStations.map((station) => {
            // Chỉ hiển thị trạm có tọa độ hợp lệ
            if (!station.latitude || !station.longitude) return null;
            
            return (
              <Marker
                key={station.id}
                position={[station.latitude, station.longitude]}
                icon={createStationIcon(station)}
              >
                <Popup>
                  <div className="station-popup">
                    <h4>{station.name}</h4>
                    <p><strong>Địa chỉ:</strong> {station.address}</p>
                    <p><strong>Pin có sẵn:</strong> {station.availableSlots}/{station.totalSlots}</p>
                    <p><strong>Trạng thái:</strong> 
                      {station.status === 'ACTIVE' ? ' 🟢 Hoạt động' : 
                       station.status === 'MAINTENANCE' ? ' 🟡 Bảo trì' : ' 🔴 Ngừng hoạt động'}
                    </p>
                    {station.id.startsWith('demo-') && (
                      <p><em>📍 Dữ liệu demo</em></p>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};