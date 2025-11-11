import { Input, Modal, Select, InputNumber, message } from 'antd';
import { useState } from 'react';
import axios from 'axios';
import './CreateBatteryModal.css';

interface ICModalProps {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  onAdded?: () => void; // callback để reload danh sách pin
}

const { Option } = Select;
const API_URL = "http://localhost:8082/api/inventory";

const CreateBatteryModal = ({ isOpen, setIsOpen, onAdded }: ICModalProps) => {
  const [model, setModel] = useState('');
  const [capacity, setCapacity] = useState('');
  const [chargeLevel, setChargeLevel] = useState(0);
  const [status, setStatus] = useState<'FULL' | 'CHARGING' | 'MAINTENANCE'>('FULL');
  const [health, setHealth] = useState(100);
  const [stationId, setStationId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!model || !capacity || !stationId) {
      return;
    }

    setLoading(true);

    axios.post(API_URL, {
      model,
      capacity,
      chargeLevel,
      status,
      health,
      station_id: stationId
    }).then(() => {
      setIsOpen(false);
      setModel(''); setCapacity(''); setChargeLevel(0);
      setStatus('FULL'); setHealth(100); setStationId('');
      if(onAdded) onAdded();
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <Modal
      title="Thêm pin mới"
      open={isOpen}
      onOk={handleSubmit}
      onCancel={() => setIsOpen(false)}
      okText="Thêm"
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
