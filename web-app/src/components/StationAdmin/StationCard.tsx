import { type Station } from '../../types/station';
import './StationCard.css';

interface StationCardProps {
  station: Station;
  onEdit: (station: Station) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
  onViewDetails: (station: Station) => void;
}

const StationCard = ({ 
  station, 
  onEdit, 
  onDelete, 
  onStatusChange, 
  onViewDetails 
}: StationCardProps) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'statusBadge statusActive';
      case 'INACTIVE': return 'statusBadge statusInactive';
      case 'MAINTENANCE': return 'statusBadge statusMaintenance';
      default: return 'statusBadge';
    }
  };

  const getSelectClass = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'statusSelect active';
      case 'INACTIVE': return 'statusSelect inactive';
      case 'MAINTENANCE': return 'statusSelect maintenance';
      default: return 'statusSelect';
    }
  };

    // Xử lý click toàn bộ card
  const handleCardClick = () => {
      onViewDetails(station);
  };
  
  // Ngăn event bubbling khi click các button
  const handleActionClick = (e: React.MouseEvent, callback?: Function) => {
    e.stopPropagation();
    if(callback){
      callback();
    }
  };
  
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      e.stopPropagation();
      onStatusChange(station.id, e.target.value);
    };

  // Format address nếu quá dài
  const formatAddress = (address: string) => {
    if (address.length > 50) {
      return address.substring(0, 50) + '...';
    }
    return address;
  };

  return (
    <div className="stationCard" onClick={handleCardClick}>
      <div className="cardHeader">
        <h3 className="stationName">{station.name}</h3>
        <span className={getStatusClass(station.status)}>
          {station.status}
        </span>
      </div>
      
      <div className="stationDetails">
        <div className="detailItem">
          <span className="detailLabel">Address:</span> 
          {formatAddress(station.address)}
        </div>
        <div className="detailItem">
          <span className="detailLabel">Available Slots:</span> 
          <span className={station.availableSlots === 0 ? 'text-danger' : 'text-success'}>
            {station.availableSlots || 0} / {station.totalSlots}
          </span>
        </div>
        <div className="detailItem">
          <span className="detailLabel">Manager:</span> {station.managerId || 'Not assigned'}
        </div>
        <div className="detailItem">
          <span className="detailLabel">Location:</span> {station.latitude.toFixed(6)}, {station.longitude.toFixed(6)}
        </div>
      </div>

      <div className="cardActions">
        <div className="actionButtons">
          <button
            className="editButton"
            onClick={(e) => handleActionClick(e, () => onEdit(station))}
          >
            Edit
          </button>
          <button
            className="deleteButton"
            onClick={(e) => handleActionClick(e, () => onDelete(station.id))}
          >
            Delete
          </button>
        </div>
        
        <select
          className={getSelectClass(station.status)}
          value={station.status}
          onClick={(e) => handleActionClick(e)} // CHỈ STOP PROPAGATION, KHÔNG CALL CALLBACK
          onChange={handleSelectChange}
        >
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
          <option value="MAINTENANCE">Maintenance</option>
        </select>
      </div>
    </div>
  );
};

export default StationCard;