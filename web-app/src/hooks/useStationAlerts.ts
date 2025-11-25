import { useState, useEffect, useCallback } from 'react';
import { stationAlertService } from '../services/stations/stationAlerts';
import { type StationAlertResponse, type StationAlertRequest, type AlertType, type AlertSeverity, type AlertStatus } from '../types/stationAlert';

interface UseStationAlertsReturn {
  // State
  alerts: StationAlertResponse[];
  loading: boolean;
  error: string | null;
  selectedAlert: StationAlertResponse | null;
  filters: AlertFilters;
  
  // Actions
  setSelectedAlert: (alert: StationAlertResponse | null) => void;
  setFilters: (filters: AlertFilters) => void;
  fetchAlerts: () => Promise<void>;
  createAlert: (alertData: StationAlertRequest) => Promise<StationAlertResponse>;
  acknowledgeAlert: (id: string, acknowledgedBy: string) => Promise<StationAlertResponse>;
  resolveAlert: (id: string, resolvedBy: string, resolutionNotes?: string) => Promise<StationAlertResponse>;
  deleteAlert: (id: string) => Promise<void>;
  getAlertsByStation: (stationId: string) => Promise<StationAlertResponse[]>;
  getActiveAlertsByStation: (stationId: string) => Promise<StationAlertResponse[]>;
  getCriticalActiveAlerts: () => Promise<StationAlertResponse[]>;
  getAlertsByType: (alertType: AlertType) => Promise<StationAlertResponse[]>;
  getAlertsBySeverity: (severity: AlertSeverity) => Promise<StationAlertResponse[]>;
  getActiveAlertCount: (stationId: string) => Promise<number>;
  getAlertById: (id: string) => Promise<StationAlertResponse>;
  clearError: () => void;
  refetch: () => Promise<void>;
  clearFilters: () => void;
}

interface AlertFilters {
  stationId?: string;
  alertType?: AlertType;
  severity?: AlertSeverity;
  status?: AlertStatus;
  isActive?: boolean;
  isCritical?: boolean;
}

const ACTIVE_STATUS: AlertStatus = 'ACTIVE';
const ACKNOWLEDGED_STATUS: AlertStatus = 'ACKNOWLEDGED';
const RESOLVED_STATUS: AlertStatus = 'RESOLVED';
const CRITICAL_SEVERITY: AlertSeverity = 'CRITICAL';
const HIGH_SEVERITY: AlertSeverity = 'HIGH';
const MEDIUM_SEVERITY: AlertSeverity = 'MEDIUM';
const LOW_SEVERITY: AlertSeverity = 'LOW';

export const useStationAlerts = (initialFilters?: AlertFilters): UseStationAlertsReturn => {
  const [alerts, setAlerts] = useState<StationAlertResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<StationAlertResponse | null>(null);
  const [filters, setFilters] = useState<AlertFilters>(initialFilters || {});

  // Apply filters to alerts
  const applyFilters = useCallback((alertsList: StationAlertResponse[]): StationAlertResponse[] => {
    return alertsList.filter(alert => {
      if (filters.stationId && alert.stationId !== filters.stationId) return false;
      if (filters.alertType && alert.alertType !== filters.alertType) return false;
      if (filters.severity && alert.severity !== filters.severity) return false;
      if (filters.status && alert.status !== filters.status) return false;
      if (filters.isActive && alert.status !== ACTIVE_STATUS) return false;
      if (filters.isCritical && alert.severity !== CRITICAL_SEVERITY) return false;
      return true;
    });
  }, [filters]);

  // Fetch all alerts
  const fetchAlerts = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await stationAlertService.getAllAlerts();
      const filteredData = applyFilters(data);
      setAlerts(filteredData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch alerts';
      setError(errorMessage);
      console.error('Error fetching alerts:', err);
    } finally {
      setLoading(false);
    }
  }, [applyFilters]);

  // Get alert by ID
  const getAlertById = useCallback(async (id: string): Promise<StationAlertResponse> => {
    setLoading(true);
    setError(null);
    
    try {
      const alert = await stationAlertService.getAlertById(id);
      return alert;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch alert';
      setError(errorMessage);
      console.error('Error fetching alert:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Tạo alert
  const createAlert = useCallback(async (alertData: StationAlertRequest): Promise<StationAlertResponse> => {
    setError(null);
    
    try {
      const newAlert = await stationAlertService.createAlert(alertData);
      setAlerts(prev => {
        const updated = [newAlert, ...prev];
        return applyFilters(updated);
      });
      return newAlert;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create alert';
      setError(errorMessage);
      console.error('Error creating alert:', err);
      throw err;
    }
  }, [applyFilters]);

  // Xác nhận alert
  const acknowledgeAlert = useCallback(async (id: string, acknowledgedBy: string): Promise<StationAlertResponse> => {
    setError(null);
    
    try {
      const updatedAlert = await stationAlertService.acknowledgeAlert(id, acknowledgedBy);
      setAlerts(prev => {
        const updated = prev.map(alert => 
          alert.id === id ? updatedAlert : alert
        );
        return applyFilters(updated);
      });
      
      if (selectedAlert?.id === id) {
        setSelectedAlert(updatedAlert);
      }
      
      return updatedAlert;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to acknowledge alert';
      setError(errorMessage);
      console.error('Error acknowledging alert:', err);
      throw err;
    }
  }, [selectedAlert, applyFilters]);

  // Resolve alert
  const resolveAlert = useCallback(async (
    id: string, 
    resolvedBy: string, 
    resolutionNotes?: string
  ): Promise<StationAlertResponse> => {
    setError(null);
    
    try {
      const updatedAlert = await stationAlertService.resolveAlert(id, resolvedBy, resolutionNotes);
      setAlerts(prev => {
        const updated = prev.map(alert => 
          alert.id === id ? updatedAlert : alert
        );
        return applyFilters(updated);
      });
      
      if (selectedAlert?.id === id) {
        setSelectedAlert(updatedAlert);
      }
      
      return updatedAlert;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to resolve alert';
      setError(errorMessage);
      console.error('Error resolving alert:', err);
      throw err;
    }
  }, [selectedAlert, applyFilters]);

  // Delete alert
  const deleteAlert = useCallback(async (id: string): Promise<void> => {
    setError(null);
    
    try {
      await stationAlertService.deleteAlert(id);
      setAlerts(prev => {
        const updated = prev.filter(alert => alert.id !== id);
        return applyFilters(updated);
      });
      
      if (selectedAlert?.id === id) {
        setSelectedAlert(null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete alert';
      setError(errorMessage);
      console.error('Error deleting alert:', err);
      throw err;
    }
  }, [selectedAlert, applyFilters]);

  // Specialized fetch methods
  const getAlertsByStation = useCallback(async (stationId: string): Promise<StationAlertResponse[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const stationAlerts = await stationAlertService.getAlertsByStation(stationId);
      return stationAlerts;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch station alerts';
      setError(errorMessage);
      console.error('Error fetching station alerts:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getActiveAlertsByStation = useCallback(async (stationId: string): Promise<StationAlertResponse[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const activeAlerts = await stationAlertService.getActiveAlertsByStation(stationId);
      return activeAlerts;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch active station alerts';
      setError(errorMessage);
      console.error('Error fetching active station alerts:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getCriticalActiveAlerts = useCallback(async (): Promise<StationAlertResponse[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const criticalAlerts = await stationAlertService.getCriticalActiveAlerts();
      return criticalAlerts;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch critical active alerts';
      setError(errorMessage);
      console.error('Error fetching critical active alerts:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getAlertsByType = useCallback(async (alertType: AlertType): Promise<StationAlertResponse[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const typeAlerts = await stationAlertService.getAlertsByType(alertType);
      return typeAlerts;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch alerts by type';
      setError(errorMessage);
      console.error('Error fetching alerts by type:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getAlertsBySeverity = useCallback(async (severity: AlertSeverity): Promise<StationAlertResponse[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const severityAlerts = await stationAlertService.getAlertsBySeverity(severity);
      return severityAlerts;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch alerts by severity';
      setError(errorMessage);
      console.error('Error fetching alerts by severity:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getActiveAlertCount = useCallback(async (stationId: string): Promise<number> => {
    setError(null);
    
    try {
      const count = await stationAlertService.getActiveAlertCount(stationId);
      return count;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch active alert count';
      setError(errorMessage);
      console.error('Error fetching active alert count:', err);
      throw err;
    }
  }, []);

  // Utility methods
  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  const refetch = useCallback(async (): Promise<void> => {
    await fetchAlerts();
  }, [fetchAlerts]);

  const clearFilters = useCallback((): void => {
    setFilters({});
  }, []);

  const handleSetSelectedAlert = useCallback((alert: StationAlertResponse | null): void => {
    setSelectedAlert(alert);
  }, []);

  const handleSetFilters = useCallback((newFilters: AlertFilters): void => {
    setFilters(newFilters);
  }, []);

  // Load alerts on mount and when filters change
  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  return {
    // State
    alerts,
    loading,
    error,
    selectedAlert,
    filters,
    
    // Actions
    setSelectedAlert: handleSetSelectedAlert,
    setFilters: handleSetFilters,
    fetchAlerts,
    createAlert,
    acknowledgeAlert,
    resolveAlert,
    deleteAlert,
    getAlertsByStation,
    getActiveAlertsByStation,
    getCriticalActiveAlerts,
    getAlertsByType,
    getAlertsBySeverity,
    getActiveAlertCount,
    getAlertById,
    clearError,
    refetch,
    clearFilters,
  };
};

// Hook for alert statistics
export const useAlertStats = (alerts: StationAlertResponse[]) => {
  const stats = {
    total: alerts.length,
    active: alerts.filter(a => a.status === ACTIVE_STATUS).length,
    acknowledged: alerts.filter(a => a.status === ACKNOWLEDGED_STATUS).length,
    resolved: alerts.filter(a => a.status === RESOLVED_STATUS).length,
    critical: alerts.filter(a => a.severity === CRITICAL_SEVERITY).length,
    high: alerts.filter(a => a.severity === HIGH_SEVERITY).length,
    medium: alerts.filter(a => a.severity === MEDIUM_SEVERITY).length,
    low: alerts.filter(a => a.severity === LOW_SEVERITY).length,
  };

  // Statistics by alert type
  const byType = {
    maintenance: alerts.filter(a => a.alertType === 'MAINTENANCE').length,
    performance: alerts.filter(a => a.alertType === 'PERFORMANCE').length,
    safety: alerts.filter(a => a.alertType === 'SAFETY').length,
    power: alerts.filter(a => a.alertType === 'POWER').length,
    network: alerts.filter(a => a.alertType === 'NETWORK').length,
    battery: alerts.filter(a => a.alertType === 'BATTERY').length,
  };

  return {
    stats,
    byType,
  };
};