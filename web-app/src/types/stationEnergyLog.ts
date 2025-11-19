export interface StationEnergyLog {
  id: string;
  stationId: string;
  station?: {
    id: string;
    name: string;
  };
  energyConsumed: number;
  powerDemand: number;
  voltage: number;
  current: number;
  loggedAt: string;
  timeSlot: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface StationEnergyLogRequest {
  stationId: string;
  energyConsumed: number;
  powerDemand: number;
  voltage: number;
  current: number;
  loggedAt?: string;
  timeSlot: string;
}

export interface StationEnergyLogResponse {
  id: string;
  stationId: string;
  station?: {
    id: string;
    name: string;
  };
  energyConsumed: number;
  powerDemand: number;
  voltage: number;
  current: number;
  loggedAt: string;
  timeSlot: string;
  createdAt?: string;
  updatedAt?: string;
}