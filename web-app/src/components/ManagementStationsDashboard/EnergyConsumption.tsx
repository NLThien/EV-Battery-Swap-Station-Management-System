import "./EnergyConsumption.css"
import { useEnergyConsumption } from '../../hooks/stationAdminDashBoard/useEnergyConsumption';
import { useState, useEffect } from 'react';

export const EnergyConsumption = () => {
  const [dateFilter, setDateFilter] = useState<{
    startDate: Date;
    endDate: Date;
    groupBy: 'hour' | 'day' | 'month';
  } | null>(null);

  const { 
    chartData, 
    stats, 
    loading, 
    error, 
    createDateFilter, 
    getDataDateRange,
    hasData 
  } = useEnergyConsumption(dateFilter || undefined);

  const handleTimeRangeChange = (days: number, groupBy: 'hour' | 'day' | 'month') => {
    setDateFilter(createDateFilter(days, groupBy));
  };

  const handleShowAllData = () => {
    setDateFilter(null);
  };

  // Debug để xem data
  useEffect(() => {
    console.log('Chart Data:', chartData);
    console.log('Date Filter:', dateFilter);
    console.log('Has Data:', hasData);
    console.log('Stats:', stats);
  }, [chartData, dateFilter, hasData, stats]);

  useEffect(() => {
    const dateRange = getDataDateRange?.();
    if (dateRange) {
      setDateFilter({
        startDate: dateRange.minDate,
        endDate: dateRange.maxDate,
        groupBy: 'hour'
      });
    }
  }, []);

  const maxConsumption = Math.max(stats.maxConsumption, 1000);
  const threshold = 200;

  if (loading) {
    return (
      <div className="energy-consumption">
        <div className="chart-header">
          <h3>Mức Tiêu Thụ Điện</h3>
          <div className="loading-text">Đang tải dữ liệu...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="energy-consumption">
        <div className="chart-header">
          <h3>Mức Tiêu Thụ Điện</h3>
          <div className="error-text">Lỗi khi tải dữ liệu</div>
        </div>
      </div>
    );
  }

  if (!hasData) {
    const dateRange = getDataDateRange?.();
    return (
      <div className="energy-consumption">
        <div className="chart-header">
          <h3>Mức Tiêu Thụ Điện</h3>
          <div className="no-data">
            <p>Chưa có dữ liệu tiêu thụ trong khoảng thời gian đã chọn</p>
            {dateRange && (
              <p>
                Dữ liệu có sẵn từ {dateRange.minDate.toLocaleDateString()} đến {dateRange.maxDate.toLocaleDateString()}
              </p>
            )}
            <button onClick={handleShowAllData} className="show-all-btn">
              Hiển thị tất cả dữ liệu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="energy-consumption">
      <div className="chart-header">
        <h3>Mức Tiêu Thụ Điện</h3>

        <div className="date-controls">
          <div className="time-range-buttons">
            <button onClick={() => handleTimeRangeChange(1, 'hour')}>24H</button>
            <button onClick={() => handleTimeRangeChange(7, 'day')}>7 Ngày</button>
            <button onClick={() => handleTimeRangeChange(30, 'day')}>30 Ngày</button>
          </div>
          
          <div className="group-by-buttons">
            <button 
              className={(!dateFilter || dateFilter.groupBy === 'hour') ? 'active' : ''}
              onClick={() => handleTimeRangeChange(1, 'hour')}
            >
              Theo Giờ
            </button>
            <button 
              className={dateFilter?.groupBy === 'day' ? 'active' : ''}
              onClick={() => handleTimeRangeChange(7, 'day')}
            >
              Theo Ngày
            </button>
            <button 
              className={dateFilter?.groupBy === 'month' ? 'active' : ''}
              onClick={() => handleTimeRangeChange(90, 'month')}
            >
              Theo Tháng
            </button>
          </div>
        </div>

        <div className="chart-stats">
          <div className="stat">
            <span className="label">Cao nhất:</span>
            <span className="value">{stats.maxConsumption.toFixed(0)} kWh</span>
          </div>
          <div className="stat">
            <span className="label">Trung bình:</span>
            <span className="value">{stats.averageConsumption.toFixed(0)} kWh</span>
          </div>
        </div>
      </div>
      
      <div className="chart-container">
        <div className="y-axis">
          <span>{maxConsumption.toFixed(0)} kWh</span>
          <span>{(maxConsumption * 0.8).toFixed(0)} kWh</span>
          <span>{(maxConsumption * 0.6).toFixed(0)} kWh</span>
          <span>{(maxConsumption * 0.4).toFixed(0)} kWh</span>
          <span>{(maxConsumption * 0.2).toFixed(0)} kWh</span>
          <span>0 kWh</span>
        </div>
        
        <div className="chart-bars">
          {chartData.map((data, index) => {
            const barHeight = data.consumption > 0 ? (data.consumption / maxConsumption) * 100 : 2;
            
            return (
              <div key={index} className="bar-container">
                {data.isPeak && (
                  <div 
                    className="peak-indicator"
                    style={{ 
                      bottom: `${barHeight + 5}%`
                    }}
                  >
                    ⏰
                  </div>
                )}
                
                <div 
                  className={`consumption-bar ${data.isPeak ? 'peak' : ''}`}
                  style={{ 
                    height: `${barHeight}%`
                  }}
                >
                  {data.consumption > 0 && (
                    <div className="bar-value">
                      {data.consumption.toFixed(0)} kWh
                    </div>
                  )}
                </div>
                <div className="bar-label">{data.time}</div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="chart-footer">
        <div className="peak-legend">
          <span className="peak-marker">⏰ Giờ cao điểm (trên {threshold} kWh)</span>
        </div>
      </div>
    </div>
  );
};