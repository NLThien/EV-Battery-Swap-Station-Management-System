import { type ChargingSession, type ChargingSessionRequest, type ChargingSessionResponse, type CompleteSessionRequest, type ChargingStatus, type VehicleType } from '../../types/chargingSession';

const API_BASE_URL = 'http://localhost:8082/api';

export const chargingSessionService = {
  // Lấy tất cả sessions
  async getAllSessions(): Promise<ChargingSessionResponse[]> {
    const response = await fetch(`${API_BASE_URL}/charging-sessions`);
    if (!response.ok) throw new Error('Failed to fetch charging sessions');
    return response.json();
  },

  // Lấy session theo ID
  async getSessionById(id: string): Promise<ChargingSessionResponse> {
    const response = await fetch(`${API_BASE_URL}/charging-sessions/${id}`);
    if (!response.ok) throw new Error('Failed to fetch charging session');
    return response.json();
  },

  // Tạo session mới (bắt đầu charging)
  async startSession(sessionData: ChargingSessionRequest): Promise<ChargingSessionResponse> {
    const response = await fetch(`${API_BASE_URL}/charging-sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sessionData),
    });
    if (!response.ok) throw new Error('Failed to start charging session');
    return response.json();
  },

  // Hoàn thành session
  async completeSession(id: string, completeData: CompleteSessionRequest): Promise<ChargingSessionResponse> {
    const response = await fetch(`${API_BASE_URL}/charging-sessions/${id}/complete`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(completeData),
    });
    if (!response.ok) throw new Error('Failed to complete charging session');
    return response.json();
  },

  // Hủy session
  async cancelSession(id: string): Promise<ChargingSessionResponse> {
    const response = await fetch(`${API_BASE_URL}/charging-sessions/${id}/cancel`, {
      method: 'PATCH',
    });
    if (!response.ok) throw new Error('Failed to cancel charging session');
    return response.json();
  },

  // Lấy sessions theo station
  async getSessionsByStation(stationId: string): Promise<ChargingSessionResponse[]> {
    const response = await fetch(`${API_BASE_URL}/charging-sessions/station/${stationId}`);
    if (!response.ok) throw new Error('Failed to fetch station charging sessions');
    return response.json();
  },

  // Lấy sessions theo user
  async getSessionsByUser(userId: string): Promise<ChargingSessionResponse[]> {
    const response = await fetch(`${API_BASE_URL}/charging-sessions/user/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch user charging sessions');
    return response.json();
  },

  // Lấy sessions theo status
  async getSessionsByStatus(status: ChargingStatus): Promise<ChargingSessionResponse[]> {
    const response = await fetch(`${API_BASE_URL}/charging-sessions/status/${status}`);
    if (!response.ok) throw new Error('Failed to fetch charging sessions by status');
    return response.json();
  },

  // Lấy active sessions theo station
  async getActiveSessionsByStation(stationId: string): Promise<ChargingSessionResponse[]> {
    const response = await fetch(`${API_BASE_URL}/charging-sessions/station/${stationId}/active`);
    if (!response.ok) throw new Error('Failed to fetch active station sessions');
    return response.json();
  },

  // Lấy active sessions theo user
  async getActiveSessionsByUser(userId: string): Promise<ChargingSessionResponse[]> {
    const response = await fetch(`${API_BASE_URL}/charging-sessions/user/${userId}/active`);
    if (!response.ok) throw new Error('Failed to fetch active user sessions');
    return response.json();
  },

  // Lấy tổng energy delivered của station
  async getTotalEnergyDelivered(stationId: string): Promise<number> {
    const response = await fetch(`${API_BASE_URL}/charging-sessions/station/${stationId}/energy`);
    if (!response.ok) throw new Error('Failed to fetch total energy delivered');
    return response.json();
  },

  // Lấy tổng revenue của station
  async getTotalRevenue(stationId: string): Promise<number> {
    const response = await fetch(`${API_BASE_URL}/charging-sessions/station/${stationId}/revenue`);
    if (!response.ok) throw new Error('Failed to fetch total revenue');
    return response.json();
  },

  // Lấy số lượng active sessions của station
  async getActiveSessionCount(stationId: string): Promise<number> {
    const response = await fetch(`${API_BASE_URL}/charging-sessions/station/${stationId}/active-count`);
    if (!response.ok) throw new Error('Failed to fetch active session count');
    return response.json();
  },

  // Xóa session
  async deleteSession(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/charging-sessions/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete charging session');
  },

  // Generate session ID
  generateSessionId(): string {
    const timestamp = Date.now().toString().slice(-8);
    return `session_${timestamp}`;
  },

  // Helper để tính toán thời gian charging ước tính
  calculateEstimatedTime(
    batteryCapacity: number,
    startBatteryLevel: number,
    targetBatteryLevel: number,
    maxChargingRate: number
  ): number {
    const energyNeeded = batteryCapacity * (targetBatteryLevel - startBatteryLevel) / 100;
    return (energyNeeded / maxChargingRate) * 60; // minutes
  },

  // Helper để tính toán cost ước tính
  calculateEstimatedCost(energyDelivered: number, ratePerKwh: number = 0.15): number {
    return energyDelivered * ratePerKwh;
  },

  // Helper để lấy color cho status
  getStatusColor(status: ChargingStatus): string {
    const colors = {
      ACTIVE: '#28a745',
      COMPLETED: '#007bff',
      CANCELLED: '#6c757d',
      PENDING: '#ffc107'
    };
    return colors[status];
  },

  // Helper để lấy icon cho vehicle type
  getVehicleIcon(vehicleType: VehicleType): string {
    const icons = {
      CAR: '🚗',
      MOTORBIKE: '🏍️',
      BUS: '🚌',
      TRUCK: '🚚',
      SCOOTER: '🛵'
    };
    return icons[vehicleType];
  }
};