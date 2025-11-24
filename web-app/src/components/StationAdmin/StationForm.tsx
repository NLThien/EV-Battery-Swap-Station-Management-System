import { useState, useEffect } from 'react';
import { type Station } from '../../types/station'
import './StationForm.css';

// Định nghĩa props interface
interface StationFormProps {
  station?: Station | null;
  onSubmit: (stationData: any) => void;
  onCancel: () => void;
}

// Định nghĩa form data interface
interface StationFormData {
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  totalSlots: string;
  availableSlots?: string; // Optional - chỉ hiện khi edit
  managerId: string;
  status: string;
}

// Định nghĩa interface cho dữ liệu submit
interface SubmitData {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  totalSlots: number;
  availableSlots?: number; // Thêm optional property
  managerId: string | null;
  status: string;
}

const StationForm = ({ station, onSubmit, onCancel }: StationFormProps) => {
  const [formData, setFormData] = useState<StationFormData>({
    name: '',
    address: '',
    latitude: '',
    longitude: '',
    totalSlots: '',
    managerId: '',
    status: 'ACTIVE'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (station) {
      setFormData({
        name: station.name || '',
        address: station.address || '',
        latitude: station.latitude?.toString() || '',
        longitude: station.longitude?.toString() || '',
        totalSlots: station.totalSlots?.toString() || '',
        availableSlots: station.availableSlots?.toString() || '0', // Thêm khi edit
        managerId: station.managerId || '',
        status: station.status || 'ACTIVE'
      });
    } else {
      setFormData({
        name: '',
        address: '',
        latitude: '',
        longitude: '',
        totalSlots: '',
        managerId: '',
        status: 'ACTIVE'
      });
    }
  }, [station]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Station name is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.latitude.trim()) {
      newErrors.latitude = 'Latitude is required';
    } else if (isNaN(parseFloat(formData.latitude))) {
      newErrors.latitude = 'Latitude must be a valid number';
    }
    
    if (!formData.longitude.trim()) {
      newErrors.longitude = 'Longitude is required';
    } else if (isNaN(parseFloat(formData.longitude))) {
      newErrors.longitude = 'Longitude must be a valid number';
    }
    
    if (!formData.totalSlots.trim()) {
      newErrors.totalSlots = 'Total slots is required';
    } else if (parseInt(formData.totalSlots) < 0) {
      newErrors.totalSlots = 'Total slots must be a positive number';
    }

    if (formData.availableSlots !== undefined) {
      if (parseInt(formData.availableSlots) < 0) {
        newErrors.availableSlots = 'Available slots must be a positive number';
      }
      if (parseInt(formData.availableSlots) > parseInt(formData.totalSlots || '0')) {
        newErrors.availableSlots = 'Available slots cannot exceed total slots';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const submitData: SubmitData = {
        name: formData.name,
        address: formData.address,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        totalSlots: parseInt(formData.totalSlots),
        managerId: formData.managerId || '',
        status: formData.status,
        availableSlots: 0
      };

      if (station && formData.availableSlots !== undefined) {
        submitData.availableSlots = parseInt(formData.availableSlots);
      }
      console.log('Submitting station data:', {
      isEdit: !!station,
      stationId: station?.id,
      submitData: submitData
    });
      
      onSubmit(submitData);
    }
  };

  return (
    <div className="modalOverlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <h2 className="modalTitle">
            {station ? 'Edit Station' : 'Create New Station'}
          </h2>
          <p className="modalSubtitle">
            {station ? 'Update station information' : 'Add a new battery swap station to the system'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="form" noValidate>
          <div className="formGroup">
            <label htmlFor="name" className="formLabel required">
              Tên trạm
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="formInput"
              placeholder="Enter station name"
            />
            {errors.name && <div className="errorMessage">{errors.name}</div>}
          </div>

          <div className="formGroup">
            <label htmlFor="address" className="formLabel required">
              Địa chỉ
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="formInput"
              placeholder="Enter station address"
            />
            {errors.address && <div className="errorMessage">{errors.address}</div>}
          </div>

          <div className="formRow">
            <div className="formGroup">
              <label htmlFor="latitude" className="formLabel required">
                Latitude
              </label>
              <input
                type="number"
                id="latitude"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                step="any"
                required
                className="formInput"
                placeholder="e.g., 10.762622"
              />
              {errors.latitude && <div className="errorMessage">{errors.latitude}</div>}
            </div>

            <div className="formGroup">
              <label htmlFor="longitude" className="formLabel required">
                Longitude
              </label>
              <input
                type="number"
                id="longitude"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                step="any"
                required
                className="formInput"
                placeholder="e.g., 106.660172"
              />
              {errors.longitude && <div className="errorMessage">{errors.longitude}</div>}
            </div>
          </div>

          <div className="formGroup">
            <label htmlFor="totalSlots" className="formLabel required">
              Total Slots
            </label>
            <input
              type="number"
              id="totalSlots"
              name="totalSlots"
              value={formData.totalSlots}
              onChange={handleChange}
              min="1"
              required
              className="formInput"
              placeholder="Tổng số lượng slot sạc của trạm"
            />
            {errors.totalSlots && <div className="errorMessage">{errors.totalSlots}</div>}
          </div>

          {station && (
            <div className="formGroup">
              <label htmlFor="availableSlots" className="formLabel">
                Available Slots
              </label>
              <input
                type="number"
                id="availableSlots"
                name="availableSlots"
                value={formData.availableSlots || '0'}
                onChange={handleChange}
                min="0"
                max={formData.totalSlots}
                className="formInput"
                placeholder="Số lượng chỗ sạc có thể sử dụng"
              />
              {errors.availableSlots && <div className="errorMessage">{errors.availableSlots}</div>}
            </div>
          )}

          <div className="formGroup">
            <label htmlFor="managerId" className="formLabel">
              Manager ID
            </label>
            <input
              type="text"
              id="managerId"
              name="managerId"
              value={formData.managerId}
              onChange={handleChange}
              className="formInput"
              placeholder="Nhập manager ID"
            />
          </div>

          <div className="formGroup">
            <label htmlFor="status" className="formLabel">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="formSelect"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="MAINTENANCE">Maintenance</option>
            </select>
          </div>

          <div className="formActions">
            <button
              type="button"
              onClick={onCancel}
              className="cancelButton"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submitButton"
            >
              {station ? 'Update Station' : 'Create Station'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StationForm;