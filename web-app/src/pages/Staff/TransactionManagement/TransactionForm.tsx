import { useState } from "react";
import "./TransactionForm.css";

export const TransactionForm = () => {
  const [formData, setFormData] = useState({
    driver_id: "",
    station_id: "",
    old_battery_id: "",
    new_battery_id: "",
    fee: "",
    status: "in-progress",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dữ liệu nhập vào (demo):", formData);
    alert("Demo: dữ liệu đã được ghi log ở console ✅");
  };

  return (
    <div className="transaction-form">
      <h2>🧾 Form Nhập Giao Dịch Mới (Demo)</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <input
          name="driver_id"
          placeholder="Driver ID"
          value={formData.driver_id}
          onChange={handleChange}
        />
        <input
          name="station_id"
          placeholder="Station ID"
          value={formData.station_id}
          onChange={handleChange}
        />
        <input
          name="old_battery_id"
          placeholder="Old Battery ID"
          value={formData.old_battery_id}
          onChange={handleChange}
        />
        <input
          name="new_battery_id"
          placeholder="New Battery ID"
          value={formData.new_battery_id}
          onChange={handleChange}
        />
        <input
          name="fee"
          type="number"
          placeholder="Fee (VND)"
          value={formData.fee}
          onChange={handleChange}
        />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
        <button type="submit" className="btn-submit">
          Gửi Dữ Liệu (Demo)
        </button>
      </form>
    </div>
  );
};
