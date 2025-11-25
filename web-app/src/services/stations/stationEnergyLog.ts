import { type StationEnergyLog, type StationEnergyLogRequest, type StationEnergyLogResponse} from '../../types/stationEnergyLog';

const API_BASE_URL = 'http://localhost:8086/api';

export const stationEnergyLogService = {
  // Lấy tất cả energy logs
  async getAllEnergyLogs(): Promise<StationEnergyLogResponse[]> {
    const response = await fetch(`${API_BASE_URL}/energy-logs`);
    if (!response.ok) throw new Error('Failed to fetch energy logs');
    return response.json();
  },

  // Lấy energy log theo ID
  async getEnergyLogById(id: string): Promise<StationEnergyLogResponse> {
    const response = await fetch(`${API_BASE_URL}/energy-logs/${id}`);
    if (!response.ok) throw new Error('Failed to fetch energy log');
    return response.json();
  },

  // Tạo energy log mới
  async createEnergyLog(logData: StationEnergyLogRequest): Promise<StationEnergyLogResponse> {
    const response = await fetch(`${API_BASE_URL}/energy-logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logData),
    });
    if (!response.ok) throw new Error('Failed to create energy log');
    return response.json();
  },

  // Lấy logs theo station ID
  async getLogsByStation(stationId: string): Promise<StationEnergyLogResponse[]> {
    const response = await fetch(`${API_BASE_URL}/energy-logs/station/${stationId}`);
    if (!response.ok) throw new Error('Failed to fetch station energy logs');
    return response.json();
  },

  // Lấy logs theo date range
  async getLogsByDateRange(start: Date, end: Date): Promise<StationEnergyLogResponse[]> {
    const params = new URLSearchParams({
      start: start.toISOString(),
      end: end.toISOString()
    });
    
    const response = await fetch(`${API_BASE_URL}/energy-logs/date-range?${params}`);
    if (!response.ok) throw new Error('Failed to fetch energy logs by date range');
    return response.json();
  },

  // Lấy tổng energy consumption của station
  async getTotalEnergyConsumption(stationId: string): Promise<number> {
    const response = await fetch(`${API_BASE_URL}/energy-logs/station/${stationId}/total-energy`);
    if (!response.ok) throw new Error('Failed to fetch total energy consumption');
    return response.json();
  },

  // Xóa energy log
  async deleteEnergyLog(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/energy-logs/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete energy log');
  },

  // Generate time slot (nếu cần)
  generateTimeSlot(): string {
    const now = new Date();
    const hour = now.getHours().toString().padStart(2, '0');
    return `${hour}:00-${hour}:59`;
  }
};