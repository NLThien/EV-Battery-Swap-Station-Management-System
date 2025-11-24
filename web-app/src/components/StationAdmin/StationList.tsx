import { type Station } from '../../types/station';
import StationCard from './StationCard';
import './StationList.css';

interface StationListProps {
  stations: Station[];
  loading: boolean;
  onEdit: (station: Station) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
  onViewDetails: (station: Station) => void;
  isSearching?: boolean;
}

export const StationList = ({ 
  stations, 
  loading, 
  onEdit, 
  onDelete, 
  onStatusChange,
  onViewDetails,
  isSearching = false
}: StationListProps) => {
  if (loading && stations.length > 0) {
    const message = isSearching ? "Searching..." : "Loading...";
    return (
      <div className="stationsGridContainer">
        <div className="searchLoadingOverlay">
          <div className="spinner small"></div>
          <p>{message}</p>
        </div>
        <div className="stationsGrid">
          {stations.map((station) => (
            <StationCard
              key={station.id}
              station={station}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading stations...</p>
      </div>
    );
  }

  if (stations.length === 0) {
    return (
      <div className="emptyState">
        <div className="emptyIcon">🔍</div>
        <h3>Không tìm thấy trạm</h3>
        <p>Sử dụng một từ khóa khác hoặc xem trạm mới</p>
      </div>
    );
  }

  return (
    <div className="stationsGrid">
      {stations.map((station) => (
        <StationCard
          key={station.id}
          station={station}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};