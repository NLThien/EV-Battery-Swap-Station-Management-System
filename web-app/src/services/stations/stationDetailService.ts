import {type StationDetail, type StationDetailRequest, type StationDetailSearchParams } from '../../types/stationDetail'

const API_BASE_URL = 'http://localhost:8082/api';

export const stationDetailService = {
    // thông tin chi tiết trạm
    async getAllStationDetails(): Promise<StationDetail[]> {
        const response = await fetch(`${API_BASE_URL}/station-details`);
        if (!response.ok) throw new Error('Failed to fecth staionDetail');
        return response.json();
    },

    // lấy trạm chi tiết theo id
    async getStationDetailById(id: string): Promise<StationDetail> {
        const response = await fetch(`${API_BASE_URL}/station-details/${id}`);
        if (!response.ok) throw new Error('Failed to fecth staionDetail');
        return response.json();
    },

    // Lấy station detail theo station ID
    async getStationDetailByStationId(stationId: string): Promise<StationDetail> {
        const response = await fetch(`${API_BASE_URL}/station-details/station/${stationId}`);
        if (!response.ok) throw new Error('Failed to fetch station detail by station');
        return response.json();
    },

    // Lấy station details theo manager
    async getStationDetailsByManager(managerId: string): Promise<StationDetail[]> {
        const response = await fetch(`${API_BASE_URL}/station-details/manager/${managerId}`);
        if (!response.ok) throw new Error('Failed to fetch manager station details');
        return response.json();
    },

    // Lấy stations với available slots
    async getStationsWithAvailableSlots(minSlots: number = 1): Promise<StationDetail[]> {
        const response = await fetch(`${API_BASE_URL}/station-details/available-slots?minSlots=${minSlots}`);
        if (!response.ok) throw new Error('Failed to fetch stations with available slots');
        return response.json();
    },

    // Tạo station detail mới
    async createStationDetail(stationDetailData: StationDetailRequest): Promise<StationDetail> {
        const response = await fetch(`${API_BASE_URL}/station-details`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stationDetailData),
        });
        
        if (!response.ok) {
        if (response.status === 400) {
            throw new Error('Station already has detail information');
        }
        throw new Error('Failed to create station detail');
        }
        
        return response.json();
    },

    // Cập nhật toàn bộ station detail
    async updateStationDetail(id: string, stationDetailData: StationDetailRequest): Promise<StationDetail> {
        const response = await fetch(`${API_BASE_URL}/station-details/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stationDetailData),
        });
        
        if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Station detail not found');
        }
        throw new Error('Failed to update station detail');
        }
        
        return response.json();
    },

    // Cập nhật available slots
    async updateAvailableSlots(id: string, availableSlots: number): Promise<StationDetail> {
        const response = await fetch(`${API_BASE_URL}/station-details/${id}/available-slots?availableSlots=${availableSlots}`, {
        method: 'PATCH',
        });
        
        if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Station detail not found');
        }
        throw new Error('Failed to update available slots');
        }
        
        return response.json();
    },

    // Cập nhật power usage
    async updatePowerUsage(id: string, currentPowerUsage: number): Promise<StationDetail> {
        const response = await fetch(`${API_BASE_URL}/station-details/${id}/power-usage?currentPowerUsage=${currentPowerUsage}`, {
        method: 'PATCH',
        });
        
        if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Station detail not found');
        }
        throw new Error('Failed to update power usage');
        }
        
        return response.json();
    },

    // Xóa station detail
    async deleteStationDetail(id: string): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/station-details/${id}`, {
        method: 'DELETE',
        });
        
        if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Station detail not found');
        }
        throw new Error('Failed to delete station detail');
        }
    },

    // Tìm kiếm station details
    async searchStationDetails(params: StationDetailSearchParams): Promise<StationDetail[]> {
        const queryParams = new URLSearchParams();
        
        if (params.minSlots) queryParams.append('minSlots', params.minSlots.toString());
        if (params.managerId) queryParams.append('managerId', params.managerId);
        if (params.stationId) queryParams.append('stationId', params.stationId);

        const response = await fetch(`${API_BASE_URL}/search?${queryParams}`);
        if (!response.ok) throw new Error('Failed to search station details');
        return response.json();
    }
};