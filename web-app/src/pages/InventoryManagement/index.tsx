import { useEffect, useState } from "react";
import "./BatteryInventory.css";

export type Battery = {
  id: string;
  model: string;
  capacity: string;
  chargeLevel: number;
  status: "Full" | "Charging" | "Maintenance";
  health: number;
  station_id: string;
};

// Fake API demo
const getAllBatteries = async (): Promise<Battery[]> => {
  await new Promise((r) => setTimeout(r, 1000)); // Giả delay
  return [
    {
      id: "BAT001",
      model: "Panasonic 48V",
      capacity: "2.5 kWh",
      chargeLevel: 95,
      status: "Full",
      health: 98,
      station_id: "ST001",
    },
    {
      id: "BAT002",
      model: "LG Energy 60V",
      capacity: "3.0 kWh",
      chargeLevel: 45,
      status: "Charging",
      health: 87,
      station_id: "ST002",
    },
    {
      id: "BAT003",
      model: "CATL 72V",
      capacity: "2.8 kWh",
      chargeLevel: 60,
      status: "Maintenance",
      health: 70,
      station_id: "ST003",
    },
    {
      id: "BAT004",
      model: "Panasonic 48V",
      capacity: "2.5 kWh",
      chargeLevel: 90,
      status: "Full",
      health: 95,
      station_id: "ST001",
    },
  ];
};

const BatteryInventory = () => {
  const [batteries, setBatteries] = useState<Battery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllBatteries();
      setBatteries(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="loading-section">
        <div className="loading-spinner"></div>
        <p>Đang tải dữ liệu tồn kho pin...</p>
      </div>
    );

  // 📊 Thống kê tổng hợp
  const fullCount = batteries.filter((b) => b.status === "Full").length;
  const chargingCount = batteries.filter((b) => b.status === "Charging").length;
  const maintenanceCount = batteries.filter((b) => b.status === "Maintenance").length;

  return (
    <div className="battery-inventory-page">
      <h1>⚡ Quản lý tồn kho pin</h1>
      <p>Theo dõi tình trạng, dung lượng và sức khỏe (SoH) của các pin trong hệ thống.</p>

      {/* ✅ Thống kê nhanh */}
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

      {/* 📋 Bảng chi tiết */}
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
            </tr>
          </thead>
          <tbody>
            {batteries.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.model}</td>
                <td>{b.capacity}</td>
                <td>{b.chargeLevel}%</td>
                <td>
                  <span
                    className={`soh-tag ${
                      b.health > 90
                        ? "good"
                        : b.health > 70
                        ? "medium"
                        : "low"
                    }`}
                  >
                    {b.health}%
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${b.status.toLowerCase()}`}>
                    {b.status}
                  </span>
                </td>
                <td>{b.station_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BatteryInventory;
