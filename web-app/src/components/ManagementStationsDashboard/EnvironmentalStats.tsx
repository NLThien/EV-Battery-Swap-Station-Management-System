import './EnvironmentalStats.css';

export const EnvironmentalStats = () => {
  const environmentalData = [
    {
      title: 'CO2 Giảm Thải',
      value: '24.8 t',
      subtitle: 'Tương đương năm nay',
      icon: '🌱'
    },
    {
      title: 'Điện Tái Tạo',
      value: '85%',
      subtitle: 'Năng lượng sạch sử dụng',
      icon: '☀️'
    },
    {
      title: 'Xe Điện Phục Vụ',
      value: '1,247',
      subtitle: 'Tổng số xe đã sạc',
      icon: '🚗'
    },
    {
      title: 'Nhiên Liệu Tiết Kiệm',
      value: '58k lít',
      subtitle: 'Xăng/dầu không sử dụng',
      icon: '⛽'
    }
  ];

  return (
    <div className="environmental-stats">
      <h3>Tác Động Môi Trường</h3>
      <div className="env-grid">
        {environmentalData.map((item, index) => (
          <div key={index} className="env-card">
            <div className="env-icon">{item.icon}</div>
            <div className="env-content">
              <div className="env-value">{item.value}</div>
              <div className="env-title">{item.title}</div>
              <div className="env-subtitle">{item.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};