import { Input, Modal, Select, InputNumber } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateBatteryModal.css';

interface Battery {
  id: string;
  model: string;
  capacity: string;
  chargeLevel: number;
  status: 'FULL' | 'CHARGING' | 'MAINTENANCE';
  health: number;
  stationId: string;
}

interface ICModalProps {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  onAdded?: () => void; // callback reload danh sách pin
  editingBattery?: Battery | null; // pin đang sửa
}

const { Option } = Select;
const API_URL = 'http://localhost:8083/api/inventory';

const CreateBatteryModal = ({ isOpen, setIsOpen, onAdded, editingBattery }: ICModalProps) => {
  const [model, setModel] = useState('');
  const [capacity, setCapacity] = useState('');
  const [chargeLevel, setChargeLevel] = useState(0);
  const [status, setStatus] = useState<'FULL' | 'CHARGING' | 'MAINTENANCE'>('FULL');
  const [health, setHealth] = useState(100);
  const [stationId, setStationId] = useState('');
  const [loading, setLoading] = useState(false);

  // Khi modal mở, nếu có editingBattery thì load dữ liệu lên form
  useEffect(() => {
    if (editingBattery) {
      setModel(editingBattery.model);
      setCapacity(editingBattery.capacity);
      setChargeLevel(editingBattery.chargeLevel);
      setStatus(editingBattery.status);
      setHealth(editingBattery.health);
      setStationId(editingBattery.stationId);
    } else {
      setModel('');
      setCapacity('');
      setChargeLevel(0);
      setStatus('FULL');
      setHealth(100);
      setStationId('');
    }
  }, [editingBattery, isOpen]);

  const handleSubmit = async () => {
    if (!model || !capacity || !stationId) {
      return;
    }

    setLoading(true);

    try {
      if (editingBattery) {
        // Sửa pin
        await axios.put(`${API_URL}/${editingBattery.id}`, {
          model,
          capacity,
          chargeLevel,
          status,
          health,
          stationId,
        });
      } else {
        // Thêm pin mới
        await axios.post(API_URL, {
          model,
          capacity,
          chargeLevel,
          status,
          health,
          stationId,
        });
      }

      setIsOpen(false);
      if (onAdded) onAdded();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={editingBattery ? 'Sửa thông tin pin' : 'Thêm pin mới'}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={() => setIsOpen(false)}
      okText={editingBattery ? 'Lưu' : 'Thêm'}
      cancelText="Hủy"
      confirmLoading={loading}
    >
      <div className="create-battery-form">
        <div className="form-item">
          <label>Model</label>
          <Input value={model} onChange={e => setModel(e.target.value)} />
        </div>
        <div className="form-item">
          <label>Dung lượng (kWh)</label>
          <Input value={capacity} onChange={e => setCapacity(e.target.value)} />
        </div>
        <div className="form-item">
          <label>Mức sạc (%)</label>
          <InputNumber min={0} max={100} value={chargeLevel} onChange={v => setChargeLevel(v || 0)} style={{ width: '100%' }} />
        </div>
        <div className="form-item">
          <label>Trạng thái</label>
          <Select value={status} onChange={v => setStatus(v)} style={{ width: '100%' }}>
            <Option value="FULL">Full</Option>
            <Option value="CHARGING">Charging</Option>
            <Option value="MAINTENANCE">Maintenance</Option>
          </Select>
        </div>
        <div className="form-item">
          <label>Sức khỏe (SoH %)</label>
          <InputNumber min={0} max={100} value={health} onChange={v => setHealth(v || 100)} style={{ width: '100%' }} />
        </div>
        <div className="form-item">
          <label>Trạm</label>
          <Input value={stationId} onChange={e => setStationId(e.target.value)} />
        </div>
      </div>
    </Modal>
  );
};

export default CreateBatteryModal;
