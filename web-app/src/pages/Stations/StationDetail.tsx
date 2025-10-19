import { useState, useEffect } from 'react';
import { QuickStats } from '@/components/common/QuickStats';
import { StationMap } from '@/components/Stations/StationMap';
import { StationList } from '@/components/Stations/StationList';
import '../../styles/StationDetail.css';

export const StationDetail = () => {
  const [stats, setStats] = useState({    // khởi tạo với giá trị mặc định
    totalStations: 0,
    availableBatteries: 0,
    activeSwaps: 0,
    totalUsers: 0,
    averageChargingTime: 0
  });

  const [/*loading*/, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  // THÊM: Reset scroll khi component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {     // Giả lập gọi API để lấy dữ liệu thống kê
    setTimeout(() => {
      setStats({
        totalStations: 18,
        availableBatteries: 36,
        activeSwaps: 36,
        totalUsers: 1836,
        averageChargingTime: 2.31
      });
      setLoading(false);
    }, 500);
  }, []);

  // if (loading) {   // nào có dữ liệu thì hiện loading
  //   return ( 
  //     <div className="stations-loading">
  //       <div className="loading-container">
  //         <div className="loading-spinner"></div>
  //         <div className="loading-pulse"></div>
  //       </div>
  //       <p>Đang tải dữ liệu trạm...</p>
  //     </div>
  //   );
  // }

  return (
    <div className="stations-page">
      <div className="stations-hero-detail">
        <h1>Trạm Đổi Pin EV</h1>
        <p>Xem chi tiết thông tin và tìm kiếm các trạm đổi pin</p>
  
        <QuickStats stats={stats} />

      </div>

      <div className="view-controls">
        <button 
          className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
          onClick={() => setViewMode('list')}
        >
          <span>📋</span>
          Danh Sách
        </button>
        
        <button 
          className={`toggle-btn ${viewMode === 'map' ? 'active' : ''}`}
          onClick={() => setViewMode('map')}
        >
          <span>🗺️</span>
          Bản Đồ
        </button>

        <div 
          className="toggle-indicator"
          style={{
            transform: viewMode === 'list' ? 'translateX(100%)' : 'translateX(0)',
            width: 'calc(50% - var(--spacing-xs))'
          }}
        />
      </div>

        <div className="stations-dashboard">
          <div className="main-content">
            {viewMode === 'map' ? (
              <div className="map-container">
                <StationMap />
              </div>
            ) : (
              <div className="list-container">
                <StationList />
              </div>
            )}
          </div>
        </div>
    </div>
  );
};

export default StationDetail;