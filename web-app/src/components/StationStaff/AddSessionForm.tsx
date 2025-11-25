import { useState } from 'react';
import './AddSessionForm.css';
import {calculateEstimatedTime} from '../../utils/StationChargingSession/calculateEstimatedTime'

interface AddSessionFormProps {
  stationId: string;
  onSubmit: (sessionData: any) => Promise<void>;
  onCancel: () => void;
}

interface SessionFormData {
  userId: string;
  vehicleName: string;
  batteryCapacity: number;
  startBatteryLevel: number;
  maxChargingRate: number;
}

export const AddSessionForm = ({ stationId, onSubmit, onCancel }: AddSessionFormProps) => {
  const [formData, setFormData] = useState<SessionFormData>({
    userId: '',
    vehicleName: '',
    batteryCapacity: 50,
    startBatteryLevel: 20,
    maxChargingRate: 7.4
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Xử lý submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit({
        stationId,
        userId: formData.userId,
        vehicleType: formData.vehicleName,
        batteryCapacity: formData.batteryCapacity,
        startBatteryLevel: formData.startBatteryLevel,
        maxChargingRate: formData.maxChargingRate
      });
    } catch (error) {
      console.error('Error creating session:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-session-form">
      <h4> Tạo Phiên Sạc Mới</h4>
      
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-field">
            <label>User ID *</label>
            <input 
              type="text" 
              placeholder="VD: USER_001, USER_002..." 
              value={formData.userId} 
              onChange={(e) => setFormData({...formData, userId: e.target.value})} 
              required
            />
          </div>
          
          <div className="form-field">
            <label>Tên xe *</label>
            <input 
              type="text" 
              placeholder="VD: Porsche Taycan, VinFast VF 8..." 
              value={formData.vehicleName} 
              onChange={(e) => setFormData({...formData, vehicleName: e.target.value})} 
              required
            />
          </div>
          
          <div className="form-field">
            <label>Dung lượng pin (kWh) *</label>
            <input 
              type="number" 
              placeholder="VD: 50, 75, 100..." 
              min="10"
              max="200"
              value={formData.batteryCapacity} 
              onChange={(e) => setFormData({...formData, batteryCapacity: Number(e.target.value)})} 
              required
            />
            <small>Thông thường: 50-100 kWh</small>
          </div>
          
          <div className="form-field">
            <label>Mức pin hiện tại (%) *</label>
            <input 
              type="number" 
              placeholder="VD: 20, 30, 50..." 
              min="1"
              max="99"
              value={formData.startBatteryLevel} 
              onChange={(e) => setFormData({...formData, startBatteryLevel: Number(e.target.value)})} 
              required
            />
            <small>Pin hiện tại trước khi sạc</small>
          </div>
          
          <div className="form-field">
            <label>Tốc độ sạc (kW) *</label>
            <input 
              type="number" 
              placeholder="VD: 7.4, 11, 22, 50..." 
              min="3"
              max="350"
              step="0.1"
              value={formData.maxChargingRate} 
              onChange={(e) => setFormData({...formData, maxChargingRate: Number(e.target.value)})} 
              required
            />
            <small>7.4kW (chậm), 22kW (nhanh), 50kW+ (siêu nhanh)</small>
          </div>
        </div>
        
        <div className="form-preview">
          <h5> Thông tin dự kiến:</h5>
          <div className="preview-info">
            <span>Sạc từ <strong>{formData.startBatteryLevel}%</strong> lên <strong>80%</strong></span>
            <span>Năng lượng cần sạc: <strong>{((formData.batteryCapacity * (80 - formData.startBatteryLevel)) / 100).toFixed(1)} kWh</strong></span>
            <span>Thời gian dự kiến: <strong>{calculateEstimatedTime(formData)}</strong></span>
          </div>
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="btn-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? ' Đang tạo...' : 'Bắt Đầu Sạc'}
          </button>
          <button 
            type="button" 
            onClick={onCancel}
            className="btn-cancel"
            disabled={isSubmitting}
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};