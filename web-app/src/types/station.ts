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