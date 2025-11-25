import { type StationAlert, type StationAlertRequest, type StationAlertResponse, type AlertType, type AlertSeverity } from '../../types/stationAlert';

const API_BASE_URL = 'http://localhost:8082/api';

export const stationAlertService = {
  // Lấy tất cả alerts
  async getAllAlerts(): Promise<StationAlertResponse[]> {
    const response = await fetch(`${API_BASE_URL}/alerts`);
    if (!response.ok) throw new Error('Failed to fetch alerts');
    return response.json();
  },

  // Lấy alert theo ID
  async getAlertById(id: string): Promise<StationAlertResponse> {
    const response = await fetch(`${API_BASE_URL}/alerts/${id}`);
    if (!response.ok) throw new Error('Failed to fetch alert');
    return response.json();
  },

  // Tạo alert mới
  async createAlert(alertData: StationAlertRequest): Promise<StationAlertResponse> {
    const response = await fetch(`${API_BASE_URL}/alerts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alertData),
    });
    if (!response.ok) throw new Error('Failed to create alert');
    return response.json();
  },

  // Lấy alerts theo station
  async getAlertsByStation(stationId: string): Promise<StationAlertResponse[]> {
    const response = await fetch(`${API_BASE_URL}/alerts/station/${stationId}`);
    if (!response.ok) throw new Error('Failed to fetch station alerts');
    return response.json();
  },

  // Lấy active alerts theo station
  async getActiveAlertsByStation(stationId: string): Promise<StationAlertResponse[]> {
    const response = await fetch(`${API_BASE_URL}/alerts/station/${stationId}/active`);
    if (!response.ok) throw new Error('Failed to fetch active station alerts');
    return response.json();
  },

  // Lấy critical active alerts
  async getCriticalActiveAlerts(): Promise<StationAlertResponse[]> {
    const response = await fetch(`${API_BASE_URL}/alerts/critical/active`);
    if (!response.ok) throw new Error('Failed to fetch critical active alerts');
    return response.json();
  },

  // Lấy alerts theo type
  async getAlertsByType(alertType: AlertType): Promise<StationAlertResponse[]> {
    const response = await fetch(`${API_BASE_URL}/alerts/type/${alertType}`);
    if (!response.ok) throw new Error('Failed to fetch alerts by type');
    return response.json();
  },

  // Lấy alerts theo severity
  async getAlertsBySeverity(severity: AlertSeverity): Promise<StationAlertResponse[]> {
    const response = await fetch(`${API_BASE_URL}/alerts/severity/${severity}`);
    if (!response.ok) throw new Error('Failed to fetch alerts by severity');
    return response.json();
  },

  // Acknowledge alert
  async acknowledgeAlert(id: string, acknowledgedBy: string): Promise<StationAlertResponse> {
    const response = await fetch(`${API_BASE_URL}/alerts/${id}/acknowledge?acknowledgedBy=${acknowledgedBy}`, {
      method: 'PATCH',
    });
    if (!response.ok) throw new Error('Failed to acknowledge alert');
    return response.json();
  },

  // Resolve alert
  async resolveAlert(
    id: string, 
    resolvedBy: string, 
    resolutionNotes?: string
  ): Promise<StationAlertResponse> {
    const params = new URLSearchParams({ resolvedBy });
    if (resolutionNotes) params.append('resolutionNotes', resolutionNotes);
    
    const response = await fetch(`${API_BASE_URL}/alerts/${id}/resolve?${params}`, {
      method: 'PATCH',
    });
    if (!response.ok) throw new Error('Failed to resolve alert');
    return response.json();
  },

  // Lấy số lượng active alerts của station
  async getActiveAlertCount(stationId: string): Promise<number> {
    const response = await fetch(`${API_BASE_URL}/alerts/station/${stationId}/count`);
    if (!response.ok) throw new Error('Failed to fetch active alert count');
    return response.json();
  },

  // Xóa alert
  async deleteAlert(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/alerts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete alert');
  },

  // Generate alert ID
  generateAlertId(): string {
    const timestamp = Date.now().toString().slice(-6);
    return `alert_${timestamp}`;
  },

  // Helper để tạo alert data từ energy log
  createAlertFromEnergyLog(
    stationId: string,
    alertType: AlertType,
    severity: AlertSeverity,
    metricData: {
      metricName: string;
      currentValue: number;
      thresholdValue: number;
      unit: string;
    },
    title: string,
    description: string
  ): StationAlertRequest {
    return {
      stationId,
      alertType,
      severity,
      title,
      description,
      metricName: metricData.metricName,
      currentValue: metricData.currentValue,
      thresholdValue: metricData.thresholdValue,
      unit: metricData.unit,
      triggeredAt: new Date().toISOString(),
    };
  }
};