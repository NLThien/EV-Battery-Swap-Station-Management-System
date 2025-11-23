import { useState, useEffect } from 'react';
import { useStationEnergyLogs } from '../../hooks/useStationEnergyLogs';
import './StationEnergyMonitor.css';

interface StationEnergyMonitorProps {
  stationId: string;
  detail?: any;
}

export const StationEnergyMonitor = ({ stationId, detail }: StationEnergyMonitorProps) => {
  const { getLogsByStation, getTotalEnergyConsumption } = useStationEnergyLogs();
  const [energyData, setEnergyData] = useState<any[]>([]);
  const [totalConsumption, setTotalConsumption] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEnergyData = async () => {
      try {
        setLoading(true);
        const [logs, total] = await Promise.all([
          getLogsByStation(stationId),
          getTotalEnergyConsumption(stationId)
        ]);
        
        setEnergyData(logs.slice(0, 10)); // Lấy 10 bản ghi gần nhất
        setTotalConsumption(total);
      } catch (error) {
        console.error('Error loading energy data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEnergyData();
  }, [stationId, getLogsByStation, getTotalEnergyConsumption]);

  const currentPower = detail?.powerDemand || 0;
  const currentVoltage = detail?.voltage || 0;

  return (
    <div className="station-energy-monitor">
      <div className="section-header">
        <h3>📈 Giám sát Năng lượng</h3>
        <div className="energy-summary">
          <span className="total-energy">{totalConsumption.toFixed(1)} kWh</span>
          <span className="period">Hôm nay</span>
        </div>
      </div>

      {loading ? (
        <div className="energy-loading">Đang tải dữ liệu...</div>
      ) : (
        <>
          <div className="current-stats">
            <div className="current-stat">
              <div className="stat-label">Công suất hiện tại</div>
              <div className="stat-value">{currentPower} kW</div>
              <div className={`stat-trend ${currentPower > 50 ? 'high' : 'normal'}`}>
                {currentPower > 50 ? '⚡ Cao' : '✅ Bình thường'}
              </div>
            </div>
            
            <div className="current-stat">
              <div className="stat-label">Điện áp</div>
              <div className="stat-value">{currentVoltage} V</div>
              <div className="stat-trend normal">Ổn định</div>
            </div>
          </div>

          <div className="energy-history">
            <h4>Lịch sử tiêu thụ (24h)</h4>
            <div className="history-bars">
              {energyData.slice(0, 6).map((log, index) => (
                <div key={log.id} className="energy-bar">
                  <div 
                    className="bar-fill"
                    style={{ height: `${(log.energyConsumed / 10) * 100}%` }}
                  ></div>
                  <div className="bar-label">
                    {new Date(log.timestamp).getHours()}h
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="energy-actions">
            <button className="btn-small primary">Xem báo cáo</button>
            <button className="btn-small secondary">Xuất dữ liệu</button>
          </div>
        </>
      )}
    </div>
  );
};