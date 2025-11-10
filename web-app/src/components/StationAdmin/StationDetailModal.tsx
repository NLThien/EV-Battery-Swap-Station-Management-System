import { type Station } from '../../types/station';
import './StationDetailModal.css';

interface StationDetailModalProps {
  station: Station | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (station: Station) => void;
}

const StationDetailModal = ({ station, isOpen, onClose, onEdit }: StationDetailModalProps) => {
  if (!isOpen || !station) return null;

  const getStatusClass = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'statusBadge active';
      case 'inactive': return 'statusBadge inactive';
      case 'maintenance': return 'statusBadge maintenance';
      default: return 'statusBadge';
    }
  };

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modal stationDetailModal" onClick={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <div>
            <h2 className="modalTitle">Station Details</h2>
            <p className="modalSubtitle">Complete information about {station.name}</p>
          </div>
          <button className="closeButton" onClick={onClose}>×</button>
        </div>
        
        <div className="stationDetailContent">
          <div className="detailSection">
            <h3>Basic Information</h3>
            <div className="detailGrid">
              <div className="detailItem">
                <label>Station ID</label>
                <span>{station.id}</span>
              </div>
              <div className="detailItem">
                <label>Station Name</label>
                <span>{station.name || 'N/A'}</span>
              </div>
              <div className="detailItem">
                <label>Address</label>
                <span>{station.address}</span>
              </div>
              <div className="detailItem">
                <label>Status</label>
                <span className={getStatusClass(station.status)}>
                  {station.status}
                </span>
              </div>
            </div>
          </div>

          <div className="detailSection">
            <h3>Capacity Information</h3>
            <div className="detailGrid">
              <div className="detailItem">
                <label>Total Slots</label>
                <span>{station.totalSlots || 0}</span>
              </div>
              <div className="detailItem">
                <label>Available Slots</label>
                <span className={station.availableSlots === 0 ? 'text-danger' : 'text-success'}>
                  {station.availableSlots || 0}
                </span>
              </div>
              <div className="detailItem">
                <label>Occupied Slots</label>
                <span>{(station.totalSlots || 0) - (station.availableSlots || 0)}</span>
              </div>
              <div className="detailItem">
                <label>Utilization Rate</label>
                <span>
                  {station.totalSlots ? 
                    `${Math.round(((station.totalSlots - (station.availableSlots || 0)) / station.totalSlots) * 100)}%` 
                    : '0%'
                  }
                </span>
              </div>
            </div>
          </div>

          <div className="detailSection">
            <h3>Location</h3>
            <div className="detailGrid">
              <div className="detailItem">
                <label>Latitude</label>
                <span>{station.latitude ? station.latitude.toFixed(6) : 'N/A'}</span>
              </div>
              <div className="detailItem">
                <label>Longitude</label>
                <span>{station.longitude ? station.longitude.toFixed(6) : 'N/A'}</span>
              </div>
              {station.latitude && station.longitude && (
                <div className="detailItem" style={{ gridColumn: '1 / -1' }}>
                  <label>Coordinates</label>
                  <span>{station.latitude.toFixed(6)}, {station.longitude.toFixed(6)}</span>
                </div>
              )}
            </div>
          </div>

          {station.managerId && (
            <div className="detailSection">
              <h3>Management</h3>
              <div className="detailGrid">
                <div className="detailItem">
                  <label>Manager ID</label>
                  <span>{station.managerId}</span>
                </div>
              </div>
            </div>
          )}

          {station.createdAt && (
            <div className="detailSection">
              <h3>Timestamps</h3>
              <div className="detailGrid">
                <div className="detailItem">
                  <label>Created At</label>
                  <span>{new Date(station.createdAt).toLocaleString()}</span>
                </div>
                {station.updatedAt && (
                  <div className="detailItem">
                    <label>Last Updated</label>
                    <span>{new Date(station.updatedAt).toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="modalActions">
          <button
            type="button"
            onClick={onClose}
            className="secondaryButton"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => onEdit(station)}
            className="primaryButton"
          >
            Edit Station
          </button>
        </div>
      </div>
    </div>
  );
};

export default StationDetailModal;