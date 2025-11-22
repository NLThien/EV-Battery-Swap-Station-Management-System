import { useState, useEffect, useCallback } from 'react';
import { chargingSessionService } from '../services/stations/chargingSession';
import { type ChargingSession, type ChargingSessionRequest, type ChargingSessionResponse, type CompleteSessionRequest, type ChargingStatus } from '../types/chargingSession';

interface UseChargingSessionsReturn {
  // State
  sessions: ChargingSessionResponse[];
  loading: boolean;
  error: string | null;
  selectedSession: ChargingSessionResponse | null;
  filters: SessionFilters;
  
  // Actions
  setSelectedSession: (session: ChargingSessionResponse | null) => void;
  setFilters: (filters: SessionFilters) => void;
  fetchSessions: () => Promise<void>;
  startSession: (sessionData: ChargingSessionRequest) => Promise<ChargingSessionResponse>;
  completeSession: (id: string, completeData: CompleteSessionRequest) => Promise<ChargingSessionResponse>;
  cancelSession: (id: string) => Promise<ChargingSessionResponse>;
  deleteSession: (id: string) => Promise<void>;
  pauseSession(id: string): Promise<ChargingSessionResponse>;
  resumeSession(id: string): Promise<ChargingSessionResponse>;
  getSessionsByStation: (stationId: string) => Promise<ChargingSessionResponse[]>;
  getSessionsByUser: (userId: string) => Promise<ChargingSessionResponse[]>;
  getSessionsByStatus: (status: ChargingStatus) => Promise<ChargingSessionResponse[]>;
  getActiveSessionsByStation: (stationId: string) => Promise<ChargingSessionResponse[]>;
  getActiveSessionsByUser: (userId: string) => Promise<ChargingSessionResponse[]>;
  getTotalEnergyDelivered: (stationId: string) => Promise<number>;
  getTotalRevenue: (stationId: string) => Promise<number>;
  getActiveSessionCount: (stationId: string) => Promise<number>;
  getSessionById: (id: string) => Promise<ChargingSessionResponse>;
  clearError: () => void;
  refetch: () => Promise<void>;
  clearFilters: () => void;
}

interface SessionFilters {
  stationId?: string;
  userId?: string;
  status?: ChargingStatus;
  vehicleType?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export const useChargingSessions = (initialFilters?: SessionFilters): UseChargingSessionsReturn => {
  const [sessions, setSessions] = useState<ChargingSessionResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<ChargingSessionResponse | null>(null);
  const [filters, setFilters] = useState<SessionFilters>(initialFilters || {});

  // Apply filters to sessions
  const applyFilters = useCallback((sessionsList: ChargingSessionResponse[]): ChargingSessionResponse[] => {
    return sessionsList.filter(session => {
      if (filters.stationId && session.stationId !== filters.stationId) return false;
      if (filters.userId && session.userId !== filters.userId) return false;
      if (filters.status && session.status !== filters.status) return false;
      if (filters.vehicleType && session.vehicleType !== filters.vehicleType) return false;
      if (filters.dateRange) {
        const sessionDate = new Date(session.startTime);
        if (sessionDate < filters.dateRange.start || sessionDate > filters.dateRange.end) return false;
      }
      return true;
    });
  }, [filters]);

  // Fetch all sessions
  const fetchSessions = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await chargingSessionService.getAllSessions();
      const filteredData = applyFilters(data);
      setSessions(filteredData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch charging sessions';
      setError(errorMessage);
      console.error('Error fetching charging sessions:', err);
    } finally {
      setLoading(false);
    }
  }, [applyFilters]);

  // Get session by ID
  const getSessionById = useCallback(async (id: string): Promise<ChargingSessionResponse> => {
    setLoading(true);
    setError(null);
    
    try {
      const session = await chargingSessionService.getSessionById(id);
      return session;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch charging session';
      setError(errorMessage);
      console.error('Error fetching charging session:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Start new session
  const startSession = useCallback(async (sessionData: ChargingSessionRequest): Promise<ChargingSessionResponse> => {
    setError(null);
    
    try {
      const newSession = await chargingSessionService.startSession(sessionData);
      setSessions(prev => {
        const updated = [newSession, ...prev];
        return applyFilters(updated);
      });
      return newSession;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start charging session';
      setError(errorMessage);
      console.error('Error starting charging session:', err);
      throw err;
    }
  }, [applyFilters]);

  // Complete session
  const completeSession = useCallback(async (id: string, completeData: CompleteSessionRequest): Promise<ChargingSessionResponse> => {
    setError(null);
    
    try {
      const updatedSession = await chargingSessionService.completeSession(id, completeData);
      setSessions(prev => {
        const updated = prev.map(session => 
          session.id === id ? updatedSession : session
        );
        return applyFilters(updated);
      });
      
      if (selectedSession?.id === id) {
        setSelectedSession(updatedSession);
      }
      
      return updatedSession;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to complete charging session';
      setError(errorMessage);
      console.error('Error completing charging session:', err);
      throw err;
    }
  }, [selectedSession, applyFilters]);

  // Cancel session
  const cancelSession = useCallback(async (id: string): Promise<ChargingSessionResponse> => {
    setError(null);
    
    try {
      const updatedSession = await chargingSessionService.cancelSession(id);
      setSessions(prev => {
        const updated = prev.map(session => 
          session.id === id ? updatedSession : session
        );
        return applyFilters(updated);
      });
      
      if (selectedSession?.id === id) {
        setSelectedSession(updatedSession);
      }
      
      return updatedSession;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to cancel charging session';
      setError(errorMessage);
      console.error('Error canceling charging session:', err);
      throw err;
    }
  }, [selectedSession, applyFilters]);

  // Delete session
  const deleteSession = useCallback(async (id: string): Promise<void> => {
    setError(null);
    
    try {
      await chargingSessionService.deleteSession(id);
      setSessions(prev => {
        const updated = prev.filter(session => session.id !== id);
        return applyFilters(updated);
      });
      
      if (selectedSession?.id === id) {
        setSelectedSession(null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete charging session';
      setError(errorMessage);
      console.error('Error deleting charging session:', err);
      throw err;
    }
  }, [selectedSession, applyFilters]);

  // dừng phiên
  const pauseSession = useCallback(async (id: string): Promise<ChargingSessionResponse> => {
    setError(null);
    
    try {
      const updatedSession = await chargingSessionService.pauseSession(id);
      setSessions(prev => {
        const updated = prev.map(session => 
          session.id === id ? updatedSession : session
        );
        return applyFilters(updated);
      });
      
      if (selectedSession?.id === id) {
        setSelectedSession(updatedSession);
      }
      
      return updatedSession;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to pause charging session';
      setError(errorMessage);
      console.error('Error pausing charging session:', err);
      throw err;
    }
  }, [selectedSession, applyFilters]);

  // Tiếp tục phiên sạc
  const resumeSession = useCallback(async (id: string): Promise<ChargingSessionResponse> => {
    setError(null);
    
    try {
      const updatedSession = await chargingSessionService.resumeSession(id);
      setSessions(prev => {
        const updated = prev.map(session => 
          session.id === id ? updatedSession : session
        );
        return applyFilters(updated);
      });
      
      if (selectedSession?.id === id) {
        setSelectedSession(updatedSession);
      }
      
      return updatedSession;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to resume charging session';
      setError(errorMessage);
      console.error('Error resuming charging session:', err);
      throw err;
    }
  }, [selectedSession, applyFilters]);

  // lấy phiên theo id trạm
  const getSessionsByStation = useCallback(async (stationId: string): Promise<ChargingSessionResponse[]> => {
    setLoading(true);
    setError(null);
    
    try {
        const stationSessions = await chargingSessionService.getSessionsByStation(stationId);
        return stationSessions;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch station sessions';
        setError(errorMessage);
        console.error('Error fetching station sessions:', err);
        throw err;
      } finally {
        setLoading(false);
      }
  }, []);

  const getSessionsByUser = useCallback(async (userId: string): Promise<ChargingSessionResponse[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const userSessions = await chargingSessionService.getSessionsByUser(userId);
      return userSessions;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch user sessions';
      setError(errorMessage);
      console.error('Error fetching user sessions:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getSessionsByStatus = useCallback(async (status: ChargingStatus): Promise<ChargingSessionResponse[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const statusSessions = await chargingSessionService.getSessionsByStatus(status);
      return statusSessions;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch sessions by status';
      setError(errorMessage);
      console.error('Error fetching sessions by status:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getActiveSessionsByStation = useCallback(async (stationId: string): Promise<ChargingSessionResponse[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const activeSessions = await chargingSessionService.getActiveSessionsByStation(stationId);
      return activeSessions;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch active station sessions';
      setError(errorMessage);
      console.error('Error fetching active station sessions:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getActiveSessionsByUser = useCallback(async (userId: string): Promise<ChargingSessionResponse[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const activeSessions = await chargingSessionService.getActiveSessionsByUser(userId);
      return activeSessions;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch active user sessions';
      setError(errorMessage);
      console.error('Error fetching active user sessions:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getTotalEnergyDelivered = useCallback(async (stationId: string): Promise<number> => {
    setError(null);
    
    try {
      const totalEnergy = await chargingSessionService.getTotalEnergyDelivered(stationId);
      return totalEnergy;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch total energy delivered';
      setError(errorMessage);
      console.error('Error fetching total energy delivered:', err);
      throw err;
    }
  }, []);

  const getTotalRevenue = useCallback(async (stationId: string): Promise<number> => {
    setError(null);
    
    try {
      const totalRevenue = await chargingSessionService.getTotalRevenue(stationId);
      return totalRevenue;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch total revenue';
      setError(errorMessage);
      console.error('Error fetching total revenue:', err);
      throw err;
    }
  }, []);

  const getActiveSessionCount = useCallback(async (stationId: string): Promise<number> => {
    setError(null);
    
    try {
      const count = await chargingSessionService.getActiveSessionCount(stationId);
      return count;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch active session count';
      setError(errorMessage);
      console.error('Error fetching active session count:', err);
      throw err;
    }
  }, []);

  // Utility methods
  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  const refetch = useCallback(async (): Promise<void> => {
    await fetchSessions();
  }, [fetchSessions]);

  const clearFilters = useCallback((): void => {
    setFilters({});
  }, []);

  const handleSetSelectedSession = useCallback((session: ChargingSessionResponse | null): void => {
    setSelectedSession(session);
  }, []);

  const handleSetFilters = useCallback((newFilters: SessionFilters): void => {
    setFilters(newFilters);
  }, []);

  // Load sessions on mount and when filters change
  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return {
    // State
    sessions,
    loading,
    error,
    selectedSession,
    filters,
    
    // Actions
    setSelectedSession: handleSetSelectedSession,
    setFilters: handleSetFilters,
    fetchSessions,
    startSession,
    completeSession,
    cancelSession,
    deleteSession,
    pauseSession,
    resumeSession,
    getSessionsByStation,
    getSessionsByUser,
    getSessionsByStatus,
    getActiveSessionsByStation,
    getActiveSessionsByUser,
    getTotalEnergyDelivered,
    getTotalRevenue,
    getActiveSessionCount,
    getSessionById,
    clearError,
    refetch,
    clearFilters,
  };
};

// Hook for session statistics
export const useSessionStats = (sessions: ChargingSessionResponse[]) => {
  const stats = {
    total: sessions.length,
    active: sessions.filter(s => s.status === 'ACTIVE').length,
    completed: sessions.filter(s => s.status === 'COMPLETED').length,
    cancelled: sessions.filter(s => s.status === 'CANCELLED').length,
    failed: sessions.filter(s => s.status === 'FAILED').length,
  };

  const energyStats = {
    totalDelivered: sessions
      .filter(s => s.energyDelivered)
      .reduce((sum, session) => sum + (session.energyDelivered || 0), 0),
    totalRevenue: sessions
      .filter(s => s.cost)
      .reduce((sum, session) => sum + (session.cost || 0), 0),
    averageSessionEnergy: sessions.length > 0 
      ? sessions
          .filter(s => s.energyDelivered)
          .reduce((sum, session) => sum + (session.energyDelivered || 0), 0) / 
        sessions.filter(s => s.energyDelivered).length
      : 0,
  };

  const byVehicleName = sessions.reduce((acc, session) => {
    acc[session.vehicleType] = (acc[session.vehicleType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    stats,
    energyStats,
    byVehicleName,
  };
};