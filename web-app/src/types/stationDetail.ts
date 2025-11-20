export interface StationDetail {
    id: string;
    stationId: string;
    managerId: string;
    totalSlots: number;
    availableSlots: number;
    totalBattery?: number;
    totalPowerCapacity?: number;
    currentPowerUsage?: number;
    operationalHours: string;
    contactPhone?: string;
    contactEmail?: string;
    supportHours: string;
    createdAt: string;
    updatedAt: string;
}

export interface StationDetailRequest {
  stationId: string;
  managerId?: string;
  totalSlots?: number;
  availableSlots?: number;
  totalBattery?: number;
  totalPowerCapacity?: number;
  currentPowerUsage?: number;
  operationalHours?: string;
  contactPhone?: string;
  contactEmail?: string;
  supportHours?: string;
}

export interface StationDetailSearchParams {
  minSlots?: number;
  managerId?: string;
  stationId?: string;
}
