import { useState } from "react";
import {type Station} from '../../types/station'
import { useStations } from '../../hooks/useStations'
import { StationList } from '../../components/StationAdmin/StationList'
import StationForm from '../../components/StationAdmin/StationForm';
import StationFilters from '../../components/StationAdmin/StationFilters';
import StationStats from '../../components/StationAdmin/StationStats';
import StationDetailModal from "@/components/StationAdmin/StationDetailModal";
import '../../styles/StationAdmin.css';

function StationAdmin() {
  const {
    stations,
    loading,// Loading khi search
    error,
    fetchStations,
    createStation,
    updateStation,
    deleteStation,
    updateStatus,
    searchStations,
    clearError
  } = useStations();

  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingStation, setEditingStation] = useState<Station | null>(null);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null); 
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [clearLoading, setClearLoading] = useState<boolean>(false);

  const handleCreateStation = (): void => {
    setEditingStation(null);
    setShowForm(true);
  };

  const handleEditStation = (station: Station): void => {
    setEditingStation(station);
    setShowForm(true);
  };

    // Hàm xử lý xem chi tiết
  const handleViewDetails = (station: Station): void => {
    setSelectedStation(station);
  };

  // Hàm edit từ modal chi tiết
  const handleEditFromDetails = (station: Station): void => {
    setSelectedStation(null); // Đóng modal chi tiết
    setEditingStation(station); // Mở form edit
    setShowForm(true);
  };

  const handleSubmitForm = async (formData: any): Promise<void> => {
    try {
      if (editingStation) {
        await updateStation(editingStation.id, formData);
      } else {
        await createStation(formData);
      }
      setShowForm(false);
      setEditingStation(null);
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleDeleteStation = async (id: string): Promise<void> => {
    if (window.confirm('Chắc chưa?')) {
      try {
        await deleteStation(id);
      } catch (error) {
        // Error handled in hook
      }
    }
  };

  const handleStatusChange = async (id: string, status: string): Promise<void> => {
    try {
      await updateStatus(id, status);
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleSearch = async (filters: { name?: string; status?: string }): Promise<void> => {
    setSearchLoading(true); // THÊM LOADING CHO SEARCH
    try {
      await searchStations(filters);
    } catch (error) {
      // Error handled in hook
    } finally {
      setSearchLoading(false);
      // console.log('SEARCH COMPLETE - setting searchLoading to false'); // để test giờ xóa
    }
  };

  const handleClearSearch = async (): Promise<void> => {
    setClearLoading(true); // SET LOADING CHO CLEAR
    try {
      await fetchStations();
    } catch (error) {
      // Error handled in hook
    } finally {
      setClearLoading(false);
      // console.log('CLEAR COMPLETE - setting clearLoading to false'); để test giờ xóa
    }
  };

  // COMBINE LOADING STATES
  const isLoading = loading || searchLoading || clearLoading;

  return (
    <div className="stationAdmin">
      <div className="container">
        {/* Header */}
        <div className="header">
          <div className="headerContent">
            <h1>Quản Lý Trạm Sạc</h1>
            <p>Quản lý các trạm trao đổi pin</p>
          </div>
          <button className="addButton" onClick={handleCreateStation}>
            + Thêm trạm mới
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="error">
            {error}
            <button onClick={clearError} className="dismissButton">Dismis</button>
          </div>
        )}

        {/* Statistics */}
        <StationStats stations={stations} />

        {/* Filters */}
        <StationFilters 
          onSearch={handleSearch}
          onClear={handleClearSearch}
        />

        {/* Station List */}
        <StationList
          stations={stations}
          loading={isLoading}
          onEdit={handleEditStation}
          onDelete={handleDeleteStation}
          onStatusChange={handleStatusChange}
          onViewDetails={handleViewDetails}
        />

        {/* Station Form Modal */}
        {showForm && (
          <StationForm
            station={editingStation}
            onSubmit={handleSubmitForm}
            onCancel={() => {
              setShowForm(false);
              setEditingStation(null);
            }}
          />
        )}

        {/* Station Detail Modal */}
        {selectedStation && (
          <StationDetailModal
            station={selectedStation}
            isOpen
            onClose={() => setSelectedStation(null)}
            onEdit={handleEditFromDetails}
          />
        )}
      </div>
    </div>
  );
};

export default StationAdmin;