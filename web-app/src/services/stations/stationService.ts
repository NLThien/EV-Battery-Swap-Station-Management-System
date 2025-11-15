import { type Station } from '../../types/station';

const API_BASE_URL = 'http://localhost:8082/api';

export const stationService = {
  // Lấy tất cả trạm
  async getAllStations(): Promise<Station[]> {
    const response = await fetch(`${API_BASE_URL}/stations`);
    if (!response.ok) throw new Error('Failed to fetch stations');
    return response.json();
  },

  // Lấy trạm theo ID
  async getStationById(id: string): Promise<Station> {
    const response = await fetch(`${API_BASE_URL}/stations/${id}`);
    if (!response.ok) throw new Error('Failed to fetch station');
    return response.json();
  },

  // tạo id trạm mới theo format
   generateStationId(): string {
    const timestamp = Date.now().toString().slice(-6);
    return `station_${timestamp}`;
   },

  // Tạo trạm mới (admin)
  async createStation(stationData: any): Promise<Station> {
    const response = await fetch(`${API_BASE_URL}/stations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(stationData),
    });
    if (!response.ok) throw new Error('Failed to create station');
    return response.json();
  },

  // Cập nhật trạm (admin/staff)
  async updateStation(id: string, stationData: any): Promise<Station> {
    const response = await fetch(`${API_BASE_URL}/stations/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(stationData),
    });
    if (!response.ok) throw new Error('Failed to update station');
    return response.json();
  },

  // Cập nhật trạm theo status
  async updateStationStatus(id: string, status: string): Promise<Station> {
    const response = await fetch(`${API_BASE_URL}/stations/${id}/status?status=${status}`, {
      method: 'PATCH',
    });
    if (!response.ok) throw new Error('Failed to update station status');
    return response.json();
  },

  // Xóa trạm (admin)
  async deleteStation(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/stations/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete station');
  },

  // Tìm kiếm trạm
  async searchStations(name?: string, status?: string): Promise<Station[]> {
    const params = new URLSearchParams();
    if (name) params.append('name', name);
    if (status) params.append('status', status);
    
    const response = await fetch(`${API_BASE_URL}/stations/search?${params}`);
    if (!response.ok) throw new Error('Failed to search stations');
    return response.json();
  },

  // Lấy trạm theo manager (nếu cần)
  async getStationsByManager(managerId: string): Promise<Station[]> {
    const response = await fetch(`${API_BASE_URL}/stations/manager/${managerId}`);
    if (!response.ok) throw new Error('Failed to fetch manager stations');
    return response.json();
  }
};