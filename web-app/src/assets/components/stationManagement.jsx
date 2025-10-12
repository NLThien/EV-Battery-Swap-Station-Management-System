import React, { useState, useEffect } from 'react';
import '../styles/StationManagement.css';

const StationManagement = () => {
  const [stations, setStations] = useState([]);
  const [newStation, setNewStation] = useState({
    name: '',
    location: '',
    totalSlots: 0,
    availableSlots: 0,
    status: 'active'
  });
  const [editingStation, setEditingStation] = useState(null);

  // Dữ liệu mẫu
  useEffect(() => {
    const sampleStations = [
      {
        id: 1,
        name: 'Trạm Quận 1',
        location: '123 Nguyễn Huệ, Q1',
        totalSlots: 20,
        availableSlots: 15,
        status: 'active'
      },
      {
        id: 2,
        name: 'Trạm Quận 3',
        location: '456 Lê Văn Sỹ, Q3',
        totalSlots: 15,
        availableSlots: 5,
        status: 'active'
      },
      {
        id: 3,
        name: 'Trạm Quận 7',
        location: '789 Nguyễn Văn Linh, Q7',
        totalSlots: 25,
        availableSlots: 0,
        status: 'maintenance'
      }
    ];
    setStations(sampleStations);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingStation) {
      setEditingStation({
        ...editingStation,
        [name]: value
      });
    } else {
      setNewStation({
        ...newStation,
        [name]: value
      });
    }
  };

  const handleAddStation = (e) => {
    e.preventDefault();
    const station = {
      ...newStation,
      id: Date.now(),
      totalSlots: parseInt(newStation.totalSlots),
      availableSlots: parseInt(newStation.availableSlots)
    };
    setStations([...stations, station]);
    setNewStation({
      name: '',
      location: '',
      totalSlots: 0,
      availableSlots: 0,
      status: 'active'
    });
  };

  const handleUpdateStation = (e) => {
    e.preventDefault();
    setStations(stations.map(station => 
      station.id === editingStation.id ? editingStation : station
    ));
    setEditingStation(null);
  };

  const handleEditStation = (station) => {
    setEditingStation({ ...station });
  };

  const handleDeleteStation = (id) => {
    setStations(stations.filter(station => station.id !== id));
  };

  const cancelEdit = () => {
    setEditingStation(null);
  };

  return (
    <div className="station-management">
      <header className="header">
        <h1>QUẢN LÝ TRẠM ĐỔI PIN XE ĐIỆN</h1>
      </header>

      <div className="container">
        {/* Form thêm/sửa trạm */}
        <div className="form-section">
          <h2>{editingStation ? 'SỬA TRẠM' : 'THÊM TRẠM MỚI'}</h2>
          <form onSubmit={editingStation ? handleUpdateStation : handleAddStation} className="station-form">
            <div className="form-group">
              <label>Tên trạm:</label>
              <input
                type="text"
                name="name"
                value={editingStation ? editingStation.name : newStation.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Địa chỉ:</label>
              <input
                type="text"
                name="location"
                value={editingStation ? editingStation.location : newStation.location}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Tổng số slot:</label>
                <input
                  type="number"
                  name="totalSlots"
                  value={editingStation ? editingStation.totalSlots : newStation.totalSlots}
                  onChange={handleInputChange}
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label>Slot trống:</label>
                <input
                  type="number"
                  name="availableSlots"
                  value={editingStation ? editingStation.availableSlots : newStation.availableSlots}
                  onChange={handleInputChange}
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Trạng thái:</label>
              <select
                name="status"
                value={editingStation ? editingStation.status : newStation.status}
                onChange={handleInputChange}
              >
                <option value="active">Hoạt động</option>
                <option value="maintenance">Bảo trì</option>
                <option value="inactive">Ngừng hoạt động</option>
              </select>
            </div>

            <div className="form-actions">
              {editingStation ? (
                <>
                  <button type="submit" className="btn btn-primary">Cập nhật</button>
                  <button type="button" className="btn btn-secondary" onClick={cancelEdit}>Hủy</button>
                </>
              ) : (
                <button type="submit" className="btn btn-primary">Thêm trạm</button>
              )}
            </div>
          </form>
        </div>

        {/* Danh sách trạm */}
        <div className="list-section">
          <h2>DANH SÁCH TRẠM</h2>
          <div className="stations-grid">
            {stations.map(station => (
              <div key={station.id} className={`station-card ${station.status}`}>
                <div className="station-header">
                  <h3>{station.name}</h3>
                  <span className={`status-badge ${station.status}`}>
                    {station.status === 'active' ? 'Hoạt động' : 
                     station.status === 'maintenance' ? 'Bảo trì' : 'Ngừng hoạt động'}
                  </span>
                </div>
                
                <div className="station-info">
                  <p><strong>Địa chỉ:</strong> {station.location}</p>
                  <p><strong>Tổng slot:</strong> {station.totalSlots}</p>
                  <p><strong>Slot trống:</strong> {station.availableSlots}</p>
                  <div className="slot-progress">
                    <div 
                      className="progress-bar"
                      style={{
                        width: `${(station.availableSlots / station.totalSlots) * 100}%`
                      }}
                    ></div>
                  </div>
                  <p className="slot-text">
                    {station.availableSlots}/{station.totalSlots} slot trống
                  </p>
                </div>

                <div className="station-actions">
                  <button 
                    className="btn btn-edit"
                    onClick={() => handleEditStation(station)}
                  >
                    Sửa
                  </button>
                  <button 
                    className="btn btn-delete"
                    onClick={() => handleDeleteStation(station.id)}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationManagement;