import { useEffect, useState } from "react";
import "./BatteryInventory.css";
import axios from "axios";
import CreateBatteryModal from "./createBatteryModal";

interface Battery {
  id: string;
  model: string;
  capacity: string;
  chargeLevel: number;
  status: 'FULL' | 'CHARGING' | 'MAINTENANCE';
  health: number;
  stationId: string;
}

const API_URL = "http://localhost:8083/api/inventory";

const BatteryInventory = () => {
  const [batteries, setBatteries] = useState<Battery[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Fetch data vào bảng
  const fetchBatteries = async () => {
      const res = await axios.get(API_URL);
      setBatteries(res.data); //Đưa dữ liệu vào bảng
   
  };

  useEffect(() => {
    fetchBatteries();
  }, []);

  // Thống kê
    const fullCount = batteries.filter((b) => b.status.toUpperCase() === "FULL").length;
    const chargingCount = batteries.filter((b) => b.status.toUpperCase() === "CHARGING").length;
    const maintenanceCount = batteries.filter((b) => b.status.toUpperCase() === "MAINTENANCE").length;

  // Filter
    const [filterModel, setFilterModel] = useState<string>("");
    const [filterCapacity, setFilterCapacity] = useState<string>("");
    const [filterHealth, setFilterHealth] = useState<string>("");

    const [editingBattery, setEditingBattery] = useState<Battery | null>(null);

    // Mở modal sửa
    const openEditModal = (battery: Battery) => {
      setEditingBattery(battery);
      setIsModalOpen(true); // dùng chung modal CreateBatteryModal
    };



    const deleteBattery = async (id: string) => {
      await axios.delete(`${API_URL}/${id}`);
      fetchBatteries();
    }

    const filteredBatteries = batteries.filter(b => {
    const matchModel = filterModel ? b.model === filterModel : true;
    const matchCapacity = filterCapacity ? b.capacity === filterCapacity : true;
    const matchHealth =
      filterHealth
        ? filterHealth === "good"
          ? b.health > 90
          : filterHealth === "medium"
          ? b.health > 70 && b.health <= 90
          : b.health <= 70
        : true;

    return matchModel && matchCapacity && matchHealth;
  });


  return (
    <div className="battery-inventory-page">
      <h1>⚡ Kho pin</h1>
      <p>Theo dõi tình trạng, dung lượng và sức khỏe (SoH) của các pin trong hệ thống.</p>

      {/* Thống kê nhanh */}
      <div className="battery-stats">
        <div className="stat-card full">
          <h3>{fullCount}</h3>
          <p>Pin đầy</p>
        </div>
        <div className="stat-card charging">
          <h3>{chargingCount}</h3>
          <p>Đang sạc</p>
        </div>
        <div className="stat-card maintenance">
          <h3>{maintenanceCount}</h3>
          <p>Bảo dưỡng</p>
        </div>
      </div>

      <div className="add-battery-button">
        <button onClick={() => setIsModalOpen(true)}>
          Thêm pin mới
        </button>
      </div>

      <div className="filter-section">
        <select value={filterModel} onChange={(e) => setFilterModel(e.target.value)}>
          <option value="">Model</option>
          {[...new Set(batteries.map((b) => b.model))].map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <select value={filterCapacity} onChange={(e) => setFilterCapacity(e.target.value)}>
          <option value="">Dung lượng</option>
          {[...new Set(batteries.map((b) => b.capacity))].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select value={filterHealth} onChange={(e) => setFilterHealth(e.target.value)}>
          <option value="">Sức khỏe (SoH)</option>
          <option value="good">Tốt </option>
          <option value="medium">Trung bình</option>
          <option value="low">Kém</option>
        </select>

        {/* Nút reset */}
        <button
          className="reset-btn"
          onClick={() => {
            setFilterModel("");
            setFilterCapacity("");
            setFilterHealth("");
          }}
        >
          Reset
        </button>
      </div>


    <CreateBatteryModal
      isOpen={isModalOpen}
      setIsOpen={(open) => {
        setIsModalOpen(open);
        if (!open) setEditingBattery(null); // reset sau khi đóng
      }}
      onAdded={fetchBatteries}
      editingBattery={editingBattery}
    />

      {/* Bảng chi tiết */}
      <div className="battery-table-wrapper">
          <table className="battery-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Model</th>
                <th>Dung lượng (kWh)</th>
                <th>Mức sạc (%)</th>
                <th>Sức khỏe (SoH)</th>
                <th>Trạng thái</th>
                <th>Trạm</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredBatteries.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.model}</td>
                  <td>{b.capacity}</td>
                  <td>{b.chargeLevel}%</td>
                  <td>
                    <span
                      className={`soh-tag ${b.health > 90 ? "good" : b.health > 70 ? "medium" : "low"}`}>{b.health}%
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${b.status.toLowerCase()}`}>{b.status}
                    </span>
                  </td>
                  <td>{b.stationId}</td>
                  <td>
                    <button className="edit-btn" onClick={() => {
                        setEditingBattery(b);  // set pin đang sửa
                        setIsModalOpen(true);  // mở modal
                      }}>
                      Sửa
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteBattery(b.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </div>
  );
};

export default BatteryInventory;
