import { useState, useEffect } from 'react';
import { useStationEnergyLogs } from '../useStationEnergyLogs';

export interface EnergyChartData {
  time: string;
  consumption: number;
  isPeak: boolean;
}

export interface DateFilter {
  startDate: Date;
  endDate: Date;
  groupBy: 'hour' | 'day' | 'month';
}

export const useEnergyConsumption = (dateFilter?: DateFilter) => {
  const { energyLogs, loading, error } = useStationEnergyLogs();
  const [chartData, setChartData] = useState<EnergyChartData[]>([]);
  const [stats, setStats] = useState({
    maxConsumption: 0,
    averageConsumption: 0,
    totalConsumption: 0,
    peakHours: 0
  });

  useEffect(() => {
    if (energyLogs.length > 0) {
      processEnergyData();
    }
  }, [energyLogs]);

  const processEnergyData = () => {
    // Nếu có date filter, áp dụng filter
    let logsToProcess = energyLogs;
    
    if (dateFilter) {
      logsToProcess = energyLogs.filter(log => {
        const logDate = new Date(log.loggedAt);
        return logDate >= dateFilter.startDate && logDate <= dateFilter.endDate;
      });
    }

    if (logsToProcess.length === 0) {
      console.warn('No data in selected date range, using all available data');
      logsToProcess = energyLogs;
    }

    if (logsToProcess.length === 0) {
      setChartData([]);
      setStats({ maxConsumption: 0, averageConsumption: 0, totalConsumption: 0, peakHours: 0 });
      return;
    }

    const groupBy = dateFilter?.groupBy || 'hour';
    const threshold = 200;
    let processedData: EnergyChartData[] = [];

    if (groupBy === 'hour') {
      processedData = processByHour(logsToProcess, threshold);
    } else if (groupBy === 'day') {
      processedData = processByDay(logsToProcess, threshold);
    } else if (groupBy === 'month') {
      processedData = processByMonth(logsToProcess, threshold);
    }

    // Tính statistics
    const consumptions = processedData.map(d => d.consumption);
    const maxConsumption = Math.max(0, ...consumptions);
    const totalConsumption = consumptions.reduce((sum, curr) => sum + curr, 0);
    const averageConsumption = consumptions.length > 0 ? totalConsumption / consumptions.length : 0;
    const peakHours = processedData.filter(d => d.isPeak).length;

    setChartData(processedData);
    setStats({
      maxConsumption,
      averageConsumption,
      totalConsumption,
      peakHours
    });
  };

  const processByHour = (logs: any[], threshold: number): EnergyChartData[] => {
    const timeSlotMap = new Map<string, number>();
    
    logs.forEach(log => {
      const timeSlot = log.timeSlot.split(':')[0] + ':00';
      const current = timeSlotMap.get(timeSlot) || 0;
      timeSlotMap.set(timeSlot, current + log.energyConsumed);
    });

    const processedData: EnergyChartData[] = [];
    
    for (let hour = 0; hour < 24; hour++) {
      const time = `${hour.toString().padStart(2, '0')}:00`;
      const consumption = timeSlotMap.get(time) || 0;
      
      processedData.push({
        time,
        consumption,
        isPeak: consumption > threshold
      });
    }

    return processedData;
  };

  const processByDay = (logs: any[], threshold: number): EnergyChartData[] => {
    const dayMap = new Map<string, number>();
    
    logs.forEach(log => {
      const logDate = new Date(log.loggedAt);
      const dayKey = logDate.toISOString().split('T')[0];
      const current = dayMap.get(dayKey) || 0;
      dayMap.set(dayKey, current + log.energyConsumed);
    });

    const sortedDays = Array.from(dayMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-30);

    return sortedDays.map(([day, consumption]) => ({
      time: formatDayLabel(day),
      consumption,
      isPeak: consumption > threshold
    }));
  };

  const processByMonth = (logs: any[], threshold: number): EnergyChartData[] => {
    const monthMap = new Map<string, number>();
    
    logs.forEach(log => {
      const logDate = new Date(log.loggedAt);
      const monthKey = `${logDate.getFullYear()}-${(logDate.getMonth() + 1).toString().padStart(2, '0')}`;
      const current = monthMap.get(monthKey) || 0;
      monthMap.set(monthKey, current + log.energyConsumed);
    });

    const sortedMonths = Array.from(monthMap.entries())
      .sort(([a], [b]) => a.localeCompare(b));

    return sortedMonths.map(([month, consumption]) => ({
      time: formatMonthLabel(month),
      consumption,
      isPeak: consumption > threshold
    }));
  };

  const formatDayLabel = (isoString: string): string => {
    const date = new Date(isoString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
  };

  const formatMonthLabel = (monthKey: string): string => {
    const [year, month] = monthKey.split('-');
    return `T${month}/${year}`;
  };

  const createDateFilter = (daysBack: number, groupBy: 'hour' | 'day' | 'month' = 'hour'): DateFilter => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysBack);
    
    return { startDate, endDate, groupBy };
  };

  const getDataDateRange = () => {
    if (energyLogs.length === 0) return null;
    
    const dates = energyLogs.map(log => new Date(log.loggedAt));
    const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));
    
    return { minDate, maxDate };
  };

  return {
    chartData,
    stats,
    loading,
    error,
    totalRecords: energyLogs.length,
    filteredRecords: chartData.reduce((sum, data) => sum + (data.consumption > 0 ? 1 : 0), 0),
    createDateFilter,
    getDataDateRange,
    hasData: chartData.some(data => data.consumption > 0)
  };
};