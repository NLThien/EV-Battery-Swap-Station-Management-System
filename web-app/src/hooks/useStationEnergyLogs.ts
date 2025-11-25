import { useState, useEffect, useCallback } from 'react';
import { stationEnergyLogService } from '../services/stations/stationEnergyLog';
import { type StationEnergyLog, type StationEnergyLogRequest, type StationEnergyLogResponse } from '../types/stationEnergyLog';

interface UseStationEnergyLogsReturn {
  // State
  energyLogs: StationEnergyLogResponse[];
  loading: boolean;
  error: string | null;
  selectedLog: StationEnergyLogResponse | null;
  
  // Actions
  setSelectedLog: (log: StationEnergyLogResponse | null) => void;
  fetchEnergyLogs: () => Promise<void>;
  createEnergyLog: (logData: StationEnergyLogRequest) => Promise<StationEnergyLogResponse>;
  deleteEnergyLog: (id: string) => Promise<void>;
  getLogsByStation: (stationId: string) => Promise<StationEnergyLogResponse[]>;
  getLogsByDateRange: (start: Date, end: Date) => Promise<StationEnergyLogResponse[]>;
  getTotalEnergyConsumption: (stationId: string) => Promise<number>;
  getEnergyLogById: (id: string) => Promise<StationEnergyLogResponse>;
  clearError: () => void;
  refetch: () => Promise<void>;
}

export const useStationEnergyLogs = (): UseStationEnergyLogsReturn => {
  const [energyLogs, setEnergyLogs] = useState<StationEnergyLogResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLog, setSelectedLog] = useState<StationEnergyLogResponse | null>(null);

  // Lấy tất
  const fetchEnergyLogs = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await stationEnergyLogService.getAllEnergyLogs();
      setEnergyLogs(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch energy logs';
      setError(errorMessage);
      console.error('Error fetching energy logs:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Lấy theo id
  const getEnergyLogById = useCallback(async (id: string): Promise<StationEnergyLogResponse> => {
    setLoading(true);
    setError(null);
    
    try {
      const log = await stationEnergyLogService.getEnergyLogById(id);
      return log;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch energy log';
      setError(errorMessage);
      console.error('Error fetching energy log:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create energy log
  const createEnergyLog = useCallback(async (logData: StationEnergyLogRequest): Promise<StationEnergyLogResponse> => {
    setError(null);
    
    try {
      const newLog = await stationEnergyLogService.createEnergyLog(logData);
      setEnergyLogs(prev => [...prev, newLog]);
      return newLog;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create energy log';
      setError(errorMessage);
      console.error('Error creating energy log:', err);
      throw err;
    }
  }, []);

  // Xóa energy log
  const deleteEnergyLog = useCallback(async (id: string): Promise<void> => {
    setError(null);
    
    try {
      await stationEnergyLogService.deleteEnergyLog(id);
      setEnergyLogs(prev => prev.filter(log => log.id !== id));
      
      if (selectedLog?.id === id) {
        setSelectedLog(null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete energy log';
      setError(errorMessage);
      console.error('Error deleting energy log:', err);
      throw err;
    }
  }, [selectedLog]);

  // Lấy log theo trạm
  const getLogsByStation = useCallback(async (stationId: string): Promise<StationEnergyLogResponse[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const logs = await stationEnergyLogService.getLogsByStation(stationId);
      return logs;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch station energy logs';
      setError(errorMessage);
      console.error('Error fetching station energy logs:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Lấy log trong 1 khoảng thời gian
  const getLogsByDateRange = useCallback(async (start: Date, end: Date): Promise<StationEnergyLogResponse[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const logs = await stationEnergyLogService.getLogsByDateRange(start, end);
      return logs;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch energy logs by date range';
      setError(errorMessage);
      console.error('Error fetching energy logs by date range:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get total energy consumption
  const getTotalEnergyConsumption = useCallback(async (stationId: string): Promise<number> => {
    setLoading(true);
    setError(null);
    
    try {
      const totalEnergy = await stationEnergyLogService.getTotalEnergyConsumption(stationId);
      return totalEnergy;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch total energy consumption';
      setError(errorMessage);
      console.error('Error fetching total energy consumption:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Xóa lỗi
  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  // Lấy energy logs
  const refetch = useCallback(async (): Promise<void> => {
    await fetchEnergyLogs();
  }, [fetchEnergyLogs]);

  // Set selected log
  const handleSetSelectedLog = useCallback((log: StationEnergyLogResponse | null): void => {
    setSelectedLog(log);
  }, []);

  // Load energy logs
  useEffect(() => {
    fetchEnergyLogs();
  }, [fetchEnergyLogs]);

  return {
    energyLogs,
    loading,
    error,
    selectedLog,
    
    setSelectedLog: handleSetSelectedLog,
    fetchEnergyLogs,
    createEnergyLog,
    deleteEnergyLog,
    getLogsByStation,
    getLogsByDateRange,
    getTotalEnergyConsumption,
    getEnergyLogById,
    clearError,
    refetch,
  };
};

// Hook cho thống kê năng lượng
export const useEnergyStats = (energyLogs: StationEnergyLogResponse[]) => {
  const stats = {
    totalLogs: energyLogs.length,
    totalEnergyConsumed: energyLogs.reduce((sum, log) => sum + log.energyConsumed, 0),
    averagePowerDemand: energyLogs.length > 0 
      ? energyLogs.reduce((sum, log) => sum + log.powerDemand, 0) / energyLogs.length 
      : 0,
    maxVoltage: energyLogs.length > 0 
      ? Math.max(...energyLogs.map(log => log.voltage)) 
      : 0,
    minVoltage: energyLogs.length > 0 
      ? Math.min(...energyLogs.map(log => log.voltage)) 
      : 0,
  };

  return {
    stats,
  };
};
