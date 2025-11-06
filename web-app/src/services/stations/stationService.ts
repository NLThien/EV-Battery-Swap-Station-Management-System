// tham khảo trước để viết service
import axios from 'axios';

// Định nghĩa interface cho Station
interface Station {
  id: string;
  name: string;
  address: string;
  status: string;
  availableBatteries: number;
  totalBatteries: number;
}

export const stationService = {
  // Lấy danh sách trạm
  getStations: async (): Promise<Station[]> => {
    try {
      const response = await axios.get('/api/stations');
      return response.data;
    } catch (error) {
      console.error('Error fetching stations:', error);
      return [];
    }
  },

  // Lấy thông tin 1 trạm
  getStation: async (id: string): Promise<Station | null> => {
    try {
      const response = await axios.get(`/api/stations/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching station:', error);
      return null;
    }
  },

  // Cập nhật trạm
  updateStation: async (id: string, data: Partial<Station>): Promise<Station | null> => {
    try {
      const response = await axios.put(`/api/stations/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating station:', error);
      return null;
    }
  }
};