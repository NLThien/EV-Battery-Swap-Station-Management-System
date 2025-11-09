export interface Station {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  totalSlots: number;
  availableSlots: number;
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
  managerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface StationStats {
  totalStations: number;
  availableBatteries: number;
  activeSwaps: number;
  totalUsers: number;
  averageChargingTime: number;
}