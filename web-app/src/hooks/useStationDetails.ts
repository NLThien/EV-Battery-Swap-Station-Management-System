import { useState, useEffect, useCallback } from 'react';
import { stationDetailService } from '../services/stations/stationDetailService';
import { type StationDetail, type StationDetailRequest } from '../types/stationDetail';

interface UseStationDetailsReturn {
    // State
    stationDetails: StationDetail[];
    loading: boolean;
    error: string | null;
    selectedDetail: StationDetail | null;
    
    // Actions
    setSelectedDetail: (detail: StationDetail | null) => void;
    fetchStationDetails: () => Promise<void>;
    getDetailById: (id: string) => Promise<StationDetail>;
    getDetailByStationId: (stationId: string) => Promise<StationDetail>;
    createDetail: (detailData: StationDetailRequest) => Promise<StationDetail>;
    updateDetail: (id: string, detailData: StationDetailRequest) => Promise<StationDetail>;
    updateAvailableSlots: (id: string, availableSlots: number) => Promise<StationDetail>;
    updatePowerUsage: (id: string, powerUsage: number) => Promise<StationDetail>;
    deleteDetail: (id: string) => Promise<void>;
    getDetailsByManager: (managerId: string) => Promise<StationDetail[]>;
    getStationsWithAvailableSlots: (minSlots?: number) => Promise<StationDetail[]>;
    clearError: () => void;
    refetch: () => Promise<void>;
}

export const useStationDetails = (): UseStationDetailsReturn => {
    const [stationDetails, setStationDetails] = useState<StationDetail[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedDetail, setSelectedDetail] = useState<StationDetail | null>(null);

    // lấy tất cả station detail
    const fetchStationDetails = useCallback(async (): Promise<void> => {
        setLoading(true);
        setError(null);
        
        try {
        const data = await stationDetailService.getAllStationDetails();
        setStationDetails(data);
        } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch station details';
        setError(errorMessage);
        console.error('Error fetching station details:', err);
        } finally {
        setLoading(false);
        }
    }, []);

    // Lấy trạm theo id
    const getDetailById = useCallback(async (id: string): Promise<StationDetail> => {
        setLoading(true);
        setError(null);
        
        try {
        const detail: StationDetail = await stationDetailService.getStationDetailById(id);
        return detail;
        } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch station detail';
        setError(errorMessage);
        console.error('Error fetching station detail:', err);
        throw err;
        } finally {
        setLoading(false);
        }
    }, []);

    // thấy thông tin theo id trạm
    const getDetailByStationId = useCallback(async (stationId: string): Promise<StationDetail> => {
        setLoading(true);
        setError(null);
        
        try {
        const detail = await stationDetailService.getStationDetailByStationId(stationId);
        return detail;
        } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch station detail by station';
        setError(errorMessage);
        console.error('Error fetching station detail by station:', err);
        throw err;
        } finally {
        setLoading(false);
        }
    }, []);

    // tạo trạm mới
    const createDetail = useCallback(async (detailData: StationDetailRequest): Promise<StationDetail> => {
        setError(null);
        
        try {
        const newDetail = await stationDetailService.createStationDetail(detailData);
        setStationDetails(prev => [...prev, newDetail]);
        return newDetail;
        } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to create station detail';
        setError(errorMessage);
        console.error('Error creating station detail:', err);
        throw err;
        }
    }, []);

    // Cập nhật thông tin trạm
    const updateDetail = useCallback(async (id: string, detailData: StationDetailRequest): Promise<StationDetail> => {
        setError(null);
        
        try {
        const updatedDetail = await stationDetailService.updateStationDetail(id, detailData);
        setStationDetails(prev => prev.map(detail => 
            detail.id === id ? updatedDetail : detail
        ));
        
        // Cập nhật chi tiết đã chọn nếu đó là chi tiết đang được chỉnh sửa
        if (selectedDetail?.id === id) {
            setSelectedDetail(updatedDetail);
        }
        
        return updatedDetail;
        } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to update station detail';
        setError(errorMessage);
        console.error('Error updating station detail:', err);
        throw err;
        }
    }, [selectedDetail]);

    // cập nhật số slot có sẵn
    const updateAvailableSlots = useCallback(async (id: string, availableSlots: number): Promise<StationDetail> => {
        setError(null);
        
        try {
        const updatedDetail = await stationDetailService.updateAvailableSlots(id, availableSlots);
        setStationDetails(prev => prev.map(detail => 
            detail.id === id ? updatedDetail : detail
        ));
        
        if (selectedDetail?.id === id) {
            setSelectedDetail(updatedDetail);
        }
        
        return updatedDetail;
        } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to update available slots';
        setError(errorMessage);
        console.error('Error updating available slots:', err);
        throw err;
        }
    }, [selectedDetail]);

    // Update power usage
    const updatePowerUsage = useCallback(async (id: string, powerUsage: number): Promise<StationDetail> => {
        setError(null);
        
        try {
        const updatedDetail = await stationDetailService.updatePowerUsage(id, powerUsage);
        setStationDetails(prev => prev.map(detail => 
            detail.id === id ? updatedDetail : detail
        ));
        
        if (selectedDetail?.id === id) {
            setSelectedDetail(updatedDetail);
        }
        
        return updatedDetail;
        } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to update power usage';
        setError(errorMessage);
        console.error('Error updating power usage:', err);
        throw err;
        }
    }, [selectedDetail]);

    // Xóa station detail
    const deleteDetail = useCallback(async (id: string): Promise<void> => {
        setError(null);
        
        try {
        await stationDetailService.deleteStationDetail(id);
        setStationDetails(prev => prev.filter(detail => detail.id !== id));
        
        if (selectedDetail?.id === id) {
            setSelectedDetail(null);
        }
        } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to delete station detail';
        setError(errorMessage);
        console.error('Error deleting station detail:', err);
        throw err;
        }
    }, [selectedDetail]);

    // lấy theo managerId
    const getDetailsByManager = useCallback(async (managerId: string): Promise<StationDetail[]> => {
        setLoading(true);
        setError(null);
        
        try {
        const details = await stationDetailService.getStationDetailsByManager(managerId);
        return details;
        } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch manager station details';
        setError(errorMessage);
        console.error('Error fetching manager station details:', err);
        throw err;
        } finally {
        setLoading(false);
        }
    }, []);

    // lấy trạm theo available slots
    const getStationsWithAvailableSlots = useCallback(async (minSlots: number = 1): Promise<StationDetail[]> => {
        setLoading(true);
        setError(null);
        
        try {
        const details = await stationDetailService.getStationsWithAvailableSlots(minSlots);
        return details;
        } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch stations with available slots';
        setError(errorMessage);
        console.error('Error fetching stations with available slots:', err);
        throw err;
        } finally {
        setLoading(false);
        }
    }, []);

    // Clear error
    const clearError = useCallback((): void => {
        setError(null);
    }, []);

    // Refetch
    const refetch = useCallback(async (): Promise<void> => {
        await fetchStationDetails();
    }, [fetchStationDetails]);

    // Set selected detail
    const handleSetSelectedDetail = useCallback((detail: StationDetail | null): void => {
        setSelectedDetail(detail);
    }, []);

    // Load station details on mount
    useEffect(() => {
        fetchStationDetails();
    }, [fetchStationDetails]);

    return {
        // State
        stationDetails,
        loading,
        error,
        selectedDetail,
        
        // Actions
        setSelectedDetail: handleSetSelectedDetail,
        fetchStationDetails,
        getDetailById,
        getDetailByStationId,
        createDetail,
        updateDetail,
        updateAvailableSlots,
        updatePowerUsage,
        deleteDetail,
        getDetailsByManager,
        getStationsWithAvailableSlots,
        clearError,
        refetch,
    };
};