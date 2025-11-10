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
  isSearching?: boolean; // THÊM PROP MỚI ĐỂ PHÂN BIỆT
}

export const StationList = ({ 
  stations, 
  loading, 
  onEdit, 
  onDelete, 
  onStatusChange,
  onViewDetails,
  isSearching = false // MẶC ĐỊNH LÀ FALSE
}: StationListProps) => {
  // NẾU ĐANG LOADING NHƯNG ĐÃ CÓ DỮ LIỆU -> HIỆN OVERLAY
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

  // ... các phần còn lại giữ nguyên
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
        <h3>No stations found</h3>
        <p>Try adjusting your search criteria or create a new station</p>
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