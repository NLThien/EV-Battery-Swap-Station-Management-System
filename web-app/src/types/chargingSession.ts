export type ChargingStatus = 'ACTIVE'| 'COMPLETED'| 'CANCELLED'| 'FAILED' | 'PENDING' | 'PAUSED';

export interface StationInfo {
  id: string;
  name: string;
  address: string;
}

export interface UserInfo {
  id: string;
  name: string;
  email: string;
}

export interface ChargingSession {
  id: string;
  stationId: string;
  station?: StationInfo;
  userId: string;
  user?: UserInfo;
  vehicleType: string;
  batteryCapacity: number;
  startBatteryLevel: number;
  endBatteryLevel?: number;
  energyDelivered?: number;
  maxChargingRate: number;
  startTime: string;
  endTime?: string;
  duration?: number;
  cost?: number;
  status: ChargingStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ChargingSessionRequest {
  stationId: string;
  userId: string;
  vehicleType: string;
  batteryCapacity: number;
  startBatteryLevel: number;
  maxChargingRate: number;
  startTime?: string;
}

export interface ChargingSessionResponse {
  id: string;
  stationId: string;
  station?: StationInfo;
  userId: string;
  user?: UserInfo;
  vehicleType: string;
  batteryCapacity: number;
  startBatteryLevel: number;
  endBatteryLevel?: number;
  energyDelivered?: number;
  maxChargingRate: number;
  startTime: string;
  endTime?: string;
  duration?: number;
  cost?: number;
  status: ChargingStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CompleteSessionRequest {
  endBatteryLevel: number;
  energyDelivered: number;
}