import "./EnergyConsumption.css"

export const EnergyConsumption = () => {
  const energyData = [
    { time: '00:00', consumption: 1321},
    { time: '02:00', consumption: 3850},
    { time: '04:00', consumption: 620},
    { time: '06:00', consumption: 850},
    { time: '08:00', consumption: 2450},
    { time: '10:00', consumption: 850},
    { time: '12:00', consumption: 3280},
    { time: '14:00', consumption: 850},
    { time: '16:00', consumption: 2850},
    { time: '18:00', consumption: 4000},
    { time: '20:00', consumption: 1836},
    { time: '22:00', consumption: 3636},
  ];

  const maxConsumption = 5000; // Fixed max for consistent scaling
  const threshold = 3000 // ngưỡng cao điểm

  return (
    <div className="energy-consumption">
      <div className="chart-header">
        <h3>Mức Tiêu Thụ Điện</h3>
        <div className="chart-stats">
          <div className="stat">
            <span className="label">Cao nhất:</span>
            <span className="value">3,280 kWh</span>
          </div>
          <div className="stat">
            <span className="label">Trung bình:</span>
            <span className="value">1,978 kWh</span>
          </div>
        </div>
      </div>
      
      <div className="chart-container">
        <div className="y-axis">
          <span>5,000 kWh</span>
          <span>4,000 kWh</span>
          <span>3,000 kWh</span>
          <span>2,000 kWh</span>
          <span>1,000 kWh</span>
          <span>0 kWh</span>
        </div>
        
        <div className="chart-bars">
          {energyData.map((data, index) => {
            const barHeight = (data.consumption / maxConsumption) * 100;
            const showIcon = data.consumption > threshold;
            
            return (
              <div key={index} className="bar-container">
                {showIcon && (
                  <div 
                    className="peak-indicator"
                    style={{ 
                      bottom: `${barHeight + 10}%`
                    }}
                  >
                    ⏰
                  </div>
                )}
                
                <div 
                  className={`consumption-bar ${showIcon ? 'peak' : ''}`}
                  style={{ 
                    height: `${barHeight}%`
                  }}
                >
                  <div className="bar-value">{data.consumption.toLocaleString()} kWh</div>
                </div>
                <div className="bar-label">{data.time}</div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="chart-footer">
        <div className="peak-legend">
          <span className="peak-marker">⏰ Giờ cao điểm</span>
        </div>
      </div>
    </div>
  );
};