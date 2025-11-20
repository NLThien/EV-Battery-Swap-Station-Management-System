import { useStations } from '../useStations';
import { useChargingSessions } from '../useChargingSessions';
import { useStationEnergyLogs } from '../useStationEnergyLogs';

export interface OverviewStat {
  title: string;
  value: string;
  subtitle: string;
  trend: string;
  color: string;
  rawValue?: number;
}

export const useOverviewStats = () => {
  const { stations, loading: stationsLoading } = useStations();
  const { sessions, loading: sessionsLoading } = useChargingSessions();
  const { energyLogs, loading: energyLogsLoading } = useStationEnergyLogs();

  const loading = stationsLoading || sessionsLoading || energyLogsLoading;

  const calculateStats = (): OverviewStat[] => {
    // 1. Tổng trạm
    const totalStations = stations.length;
    const activeStations = stations.filter(s => s.status === 'ACTIVE').length;
    
    // 2. Đang sạc - sessions có status ACTIVE
    const activeSessions = sessions.filter(s => s.status === 'ACTIVE').length;
    
    // 3. Công suất - tổng power demand từ energy logs
    const totalPowerDemand = energyLogs.reduce((sum, log) => sum + log.powerDemand, 0);
    const currentPowerMW = totalPowerDemand / 1000; // Convert to MW
    
    // 4. Hiệu suất - tính dựa trên uptime hoặc availability
    const availableStations = stations.filter(s => 
      s.status === 'ACTIVE'
    ).length;
    const efficiencyPercentage = totalStations > 0 
      ? Math.round((availableStations / totalStations) * 100) 
      : 0;

    // Tính trends (so với previous period - giả định)
    const previousStations = Math.max(1, totalStations - 5);
    const previousSessions = Math.max(1, activeSessions - 3);
    const previousPower = Math.max(0.1, currentPowerMW - 0.5);
    const previousEfficiency = Math.max(1, efficiencyPercentage - 5);

    return [
      {
        title: 'Tổng Trạm',
        value: totalStations.toString(),
        subtitle: `${activeStations} đang hoạt động`,
        trend: `+${Math.round(((totalStations - previousStations) / previousStations) * 100)}%`,
        color: 'var(--primary-color)',
        rawValue: totalStations
      },
      {
        title: 'Đang Sạc',
        value: activeSessions.toString(),
        subtitle: 'Xe đang sạc',
        trend: `+${Math.round(((activeSessions - previousSessions) / previousSessions) * 100)}%`,
        color: 'var(--success-color)',
        rawValue: activeSessions
      },
      {
        title: 'Công Suất',
        value: `${currentPowerMW.toFixed(1)} MW`,
        subtitle: 'Đang sử dụng',
        trend: `+${Math.round(((currentPowerMW - previousPower) / previousPower) * 100)}%`,
        color: 'var(--warning-color)',
        rawValue: currentPowerMW
      },
      {
        title: 'Hiệu Suất',
        value: `${efficiencyPercentage}%`,
        subtitle: 'Trạm khả dụng',
        trend: `+${Math.round(((efficiencyPercentage - previousEfficiency) / previousEfficiency) * 100)}%`,
        color: 'var(--info-color)',
        rawValue: efficiencyPercentage
      }
    ];
  };

  const stats = calculateStats();

  return {
    stats,
    loading,
    totalStations: stations.length,
    activeSessions: sessions.filter(s => s.status === 'ACTIVE').length,
    totalPower: energyLogs.reduce((sum, log) => sum + log.powerDemand, 0) / 1000
  };
};