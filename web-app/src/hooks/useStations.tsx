import { useState, useEffect, useCallback } from 'react';
import { stationService } from '../services/stations/stationService';
import { type Station } from '../types/station';

interface UseStationsReturn {
  // State
  stations: Station[];
  loading: boolean;
  error: string | null;
  selectedStation: Station | null;
  searchLoading: boolean; 
  
  // Actions
  setSelectedStation: (station: Station | null) => void;
  fetchStations: () => Promise<void>;
  createStation: (stationData: any) => Promise<Station>;
  updateStation: (id: string, stationData: any) => Promise<Station>;
  deleteStation: (id: string) => Promise<void>;
  updateStatus: (id: string, status: string) => Promise<Station>;
  searchStations: (filters: { name?: string; status?: string }) => Promise<void>;
  getStationById: (id: string) => Promise<Station>;
  clearError: () => void;
  refetch: () => Promise<void>;
}

export const useStations = (): UseStationsReturn => {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  // Fetch all stations
  const fetchStations = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await stationService.getAllStations();
      setStations(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch stations';
      setError(errorMessage);
      console.error('Error fetching stations:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get station by ID
  const getStationById = useCallback(async (id: string): Promise<Station> => {
    setLoading(true);
    setError(null);
    
    try {
      const station = await stationService.getStationById(id);
      return station;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch station';
      setError(errorMessage);
      console.error('Error fetching station:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Trong useStations hook
  const createStation = useCallback(async (stationData: any): Promise<Station> => {
    setError(null);
    
    try {
      // GENERATE STATION ID với format station_xxx
      const stationId = stationService.generateStationId();
      
      const newStation = await stationService.createStation({
        ...stationData,
        id: stationId, // Thêm ID được generate
      });
      
      setStations(prev => [...prev, newStation]);
      return newStation;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create station';
      setError(errorMessage);
      console.error('Error creating station:', err);
      throw err;
    }
  }, []);

  // Update station
  const updateStation = useCallback(async (id: string, stationData: any): Promise<Station> => {
    setError(null);
    
    try {
      const updatedStation = await stationService.updateStation(id, stationData);
      setStations(prev => prev.map(station => 
        station.id === id ? updatedStation : station
      ));
      
      // Update selected station if it's the one being edited
      if (selectedStation?.id === id) {
        setSelectedStation(updatedStation);
      }
      
      return updatedStation;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update station';
      setError(errorMessage);
      console.error('Error updating station:', err);
      throw err;
    }
  }, [selectedStation]);

  // Delete station
  const deleteStation = useCallback(async (id: string): Promise<void> => {
    setError(null);
    
    try {
      await stationService.deleteStation(id);
      setStations(prev => prev.filter(station => station.id !== id));
      
      // Clear selected station if it's the one being deleted
      if (selectedStation?.id === id) {
        setSelectedStation(null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete station';
      setError(errorMessage);
      console.error('Error deleting station:', err);
      throw err;
    }
  }, [selectedStation]);

  // Update station status
  const updateStatus = useCallback(async (id: string, status: string): Promise<Station> => {
    setError(null);
    
    try {
      const updatedStation = await stationService.updateStationStatus(id, status);
      setStations(prev => prev.map(station => 
        station.id === id ? updatedStation : station
      ));
      
      // Update selected station if it's the one being updated
      if (selectedStation?.id === id) {
        setSelectedStation(updatedStation);
      }
      
      return updatedStation;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update station status';
      setError(errorMessage);
      console.error('Error updating station status:', err);
      throw err;
    }
  }, [selectedStation]);

  // Search stations
  const searchStations = useCallback(async (filters: { name?: string; status?: string }): Promise<void> => {
    setSearchLoading(true);
    setError(null);
    
    try {
      const data = await stationService.searchStations(filters.name, filters.status);
      setStations(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search stations';
      setError(errorMessage);
      console.error('Error searching stations:', err);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  // Clear error
  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  // Refetch stations
  const refetch = useCallback(async (): Promise<void> => {
    await fetchStations();
  }, [fetchStations]);

  // Set selected station
  const handleSetSelectedStation = useCallback((station: Station | null): void => {
    setSelectedStation(station);
  }, []);

  // Load stations on mount
  useEffect(() => {
    fetchStations();
  }, [fetchStations]);

  return {
    // State
    stations,
    loading,
    error,
    searchLoading,
    selectedStation,
    
    // Actions
    setSelectedStation: handleSetSelectedStation,
    fetchStations,
    createStation,
    updateStation,
    deleteStation,
    updateStatus,
    searchStations,
    getStationById,
    clearError,
    refetch,
  };
};

// Optional: Hook for station statistics
export const useStationStats = (stations: Station[]) => {
  const stats = {
    total: stations.length,
    active: stations.filter(s => s.status === 'ACTIVE').length,
    inactive: stations.filter(s => s.status === 'INACTIVE').length,
    maintenance: stations.filter(s => s.status === 'MAINTENANCE').length,
  };

  const percentage = {
    active: stats.total > 0 ? (stats.active / stats.total) * 100 : 0,
    inactive: stats.total > 0 ? (stats.inactive / stats.total) * 100 : 0,
    maintenance: stats.total > 0 ? (stats.maintenance / stats.total) * 100 : 0,
  };

  return {
    stats,
    percentage,
  };
};

// Optional: Hook for station operations with optimistic updates
export const useStationOperations = () => {
  const [operationLoading, setOperationLoading] = useState<boolean>(false);
  const [operationError, setOperationError] = useState<string | null>(null);

  const executeOperation = useCallback(async (
    operation: () => Promise<any>,
    options?: {
      onSuccess?: (data: any) => void;
      onError?: (error: Error) => void;
    }
  ) => {
    setOperationLoading(true);
    setOperationError(null);
    
    try {
      const result = await operation();
      options?.onSuccess?.(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Operation failed';
      setOperationError(errorMessage);
      options?.onError?.(err as Error);
      throw err;
    } finally {
      setOperationLoading(false);
    }
  }, []);

  const clearOperationError = useCallback((): void => {
    setOperationError(null);
  }, []);

  return {
    operationLoading,
    operationError,
    executeOperation,
    clearOperationError,
  };
};