import { useState, useEffect } from 'react';
import { useStationEnergyLogs } from '../useStationEnergyLogs';

export interface EnvironmentalStats {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  trend?: 'up' | 'down' | 'neutral';
  change?: string;
  rawValue?: number;
}

export const useEnvironmentalStats = () => {
  const { energyLogs, loading, error, refetch } = useStationEnergyLogs();
  const [stats, setStats] = useState<EnvironmentalStats[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const calculateEnvironmentalImpact = (): EnvironmentalStats[] => {
    if (energyLogs.length === 0) return [];

    const totalEnergyConsumed = energyLogs.reduce((sum, log) => sum + log.energyConsumed, 0);
    const totalCO2Saved = energyLogs.reduce((sum, log) => sum + (log.co2Saved || 0), 0);
    const totalEquivalentTrees = energyLogs.reduce((sum, log) => sum + (log.equivalentTrees || 0), 0);
    const uniqueStations = new Set(energyLogs.map(log => log.stationId)).size;

    // Tính số xe điện phục vụ (ước tính dựa trên năng lượng)
    const AVERAGE_ENERGY_PER_EV = 50; // sạc đầy 1 xe mất chừng này kW
    const evsServed = Math.floor(totalEnergyConsumed / AVERAGE_ENERGY_PER_EV);

    // Tính trends (giả định)
    const previousCO2Saved = totalCO2Saved * 0.9;
    const previousTrees = totalEquivalentTrees * 0.9;
    const previousEVsServed = evsServed * 0.85;
    const previousStations = uniqueStations * 0.95;

    return [
      {
        title: 'CO2 Giảm Thải',
        value: `${(totalCO2Saved / 1000).toFixed(1)} t`, // đổi qua tấn
        subtitle: 'Lượng CO2 đã giảm thải',
        icon: '🌱',
        trend: totalCO2Saved > previousCO2Saved ? 'down' : 'up',
        change: `${((totalCO2Saved - previousCO2Saved) / previousCO2Saved * 100).toFixed(1)}%`,
        rawValue: totalCO2Saved
      },
      {
        title: 'Cây Xanh Tương Đương',
        value: `${totalEquivalentTrees.toFixed(0)} cây`,
        subtitle: 'Số cây xanh hấp thụ tương đương',
        icon: '🌳',
        trend: totalEquivalentTrees > previousTrees ? 'up' : 'down',
        change: `${((totalEquivalentTrees - previousTrees) / previousTrees * 100).toFixed(1)}%`,
        rawValue: totalEquivalentTrees
      },
      {
        title: 'Xe Điện Phục Vụ',
        value: evsServed.toLocaleString(),
        subtitle: 'Số xe điện đã được sạc',
        icon: '🚗',
        trend: evsServed > previousEVsServed ? 'up' : 'down',
        change: `${((evsServed - previousEVsServed) / previousEVsServed * 100).toFixed(1)}%`,
        rawValue: evsServed
      },
      {
        title: 'Trạm Sạc Hoạt Động',
        value: uniqueStations.toString(),
        subtitle: 'Số trạm đã ghi nhận dữ liệu',
        icon: '🔌',
        trend: uniqueStations > previousStations ? 'up' : 'down',
        change: `${((uniqueStations - previousStations) / previousStations * 100).toFixed(1)}%`,
        rawValue: uniqueStations
      }
    ];
  };

  useEffect(() => {
    if (energyLogs.length > 0) {
      const calculatedStats = calculateEnvironmentalImpact();
      setStats(calculatedStats);
      setLastUpdated(new Date());
    }
  }, [energyLogs]);

  return { 
    stats, 
    loading, 
    error, 
    refetch,
    lastUpdated,
    totalEnergyLogs: energyLogs.length,
    totalEnergyConsumed: energyLogs.reduce((sum, log) => sum + log.energyConsumed, 0),
    totalCO2Saved: energyLogs.reduce((sum, log) => sum + (log.co2Saved || 0), 0),
    totalTrees: energyLogs.reduce((sum, log) => sum + (log.equivalentTrees || 0), 0)
  };
};