import './StationMap.css';

export const StationMap = () => {
  return (
    <div className="station-map">
      <div className="map-container">
        <div className="map-visualization">
          <div className="map-content">
            <div className="map-icon">🗺️</div>
            <h3>Station Network Map</h3>
            <div className="map-actions">
              <button className="map-btn">Zoom In</button>
              <button className="map-btn">Filter Stations</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};