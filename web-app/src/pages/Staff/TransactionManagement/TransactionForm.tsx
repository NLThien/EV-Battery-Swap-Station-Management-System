import React, { useState } from "react";
import axios from "axios";
import "./TransactionForm.css";

type Status = "inProgress" | "completed" | "failed";

interface TransactionFormData {
  driverId: string;
  stationId: string;
  oldBatteryId: string;
  newBatteryId: string;
  fee: string; 
  status: Status;
}

export interface TransactionFormProps {
  onAdd?: (data: {
    driverId: string;
    stationId: string;
    oldBatteryId: string;
    newBatteryId: string;
    fee: number;
    status: Status;
  }) => void;
}

const API_URL = "http://localhost:8082/api/transactions"; 

export const TransactionForm: React.FC<TransactionFormProps> = ({ onAdd }) => {
  const [formData, setFormData] = useState<TransactionFormData>({
    driverId: "",
    stationId: "",
    oldBatteryId: "",
    newBatteryId: "",
    fee: "",
    status: "inProgress",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof TransactionFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // =========================
  // Utility functions
  // =========================
  const formatNumber = (value: string) => {
    if (!value) return "";
    const n = Number(value.replace(/[^0-9.-]/g, ""));
    if (Number.isNaN(n)) return value;
    return n.toLocaleString("vi-VN");
  };

  const normalizeNumberInput = (value: string) => value.replace(/[^\d.]/g, "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const key = name as keyof TransactionFormData;

    if (name === "fee") {
      const normalized = normalizeNumberInput(value);
      setFormData((prev) => ({ ...prev, [key]: normalized }));
    } else {
      setFormData((prev) => ({ ...prev, [key]: value }));
    }

    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setMessage(null);
  };

  // =========================
  // Validate before submit
  // =========================
  const validate = () => {
    const newErrors: Partial<Record<keyof TransactionFormData, string>> = {};
    if (!formData.driverId.trim()) newErrors.driverId = "Vui lòng nhập Driver ID";
    if (!formData.stationId.trim()) newErrors.stationId = "Vui lòng nhập Station ID";
    if (!formData.newBatteryId.trim()) newErrors.newBatteryId = "Vui lòng nhập New Battery ID";
    const feeNum = Number(formData.fee);
    if (!formData.fee || Number.isNaN(feeNum) || feeNum <= 0)
      newErrors.fee = "Phí phải là số lớn hơn 0";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    const payload = {
      driverId: formData.driverId,
      stationId: formData.stationId,
      oldBatteryId: formData.oldBatteryId,
      newBatteryId: formData.newBatteryId,
      fee: Number(formData.fee),
      timestamp: new Date().toISOString(),
      status: formData.status,
    };

    setSubmitting(true);

    try {
      const res = await axios.post(API_URL, payload);
      if (onAdd) onAdd(res.data);

      // Reset form
      setFormData({
        driverId: "",
        stationId: "",
        oldBatteryId: "",
        newBatteryId: "",
        fee: "",
        status: "inProgress",
      });
    } catch (err) {
      console.error("❌ Lỗi khi gửi giao dịch:", err);
      setMessage("❌ Gửi thất bại. Kiểm tra lại server hoặc dữ liệu!");
    } finally {
      setSubmitting(false);
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="transaction-form" aria-live="polite">
      <header className="tf-header">
        <h2>🧾 Thêm giao dịch mới</h2>
      </header>

      <form onSubmit={handleSubmit} className="form-grid" noValidate>
        <div className="form-row">
          <label htmlFor="driverId">Driver ID</label>
          <input
            id="driverId"
            name="driverId"
            placeholder="VD: DRV001"
            value={formData.driverId}
            onChange={handleChange}
            aria-invalid={!!errors.driverId}
            disabled={submitting}
          />
          {errors.driverId && <div className="error">{errors.driverId}</div>}
        </div>

        <div className="form-row">
          <label htmlFor="stationId">Station ID</label>
          <input
            id="stationId"
            name="stationId"
            placeholder="VD: ST01"
            value={formData.stationId}
            onChange={handleChange}
            aria-invalid={!!errors.stationId}
            disabled={submitting}
          />
          {errors.stationId && <div className="error">{errors.stationId}</div>}
        </div>

        <div className="form-row">
          <label htmlFor="oldBatteryId">Old Battery ID</label>
          <input
            id="oldBatteryId"
            name="oldBatteryId"
            placeholder="(nếu có)"
            value={formData.oldBatteryId}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>

        <div className="form-row">
          <label htmlFor="newBatteryId">New Battery ID</label>
          <input
            id="newBatteryId"
            name="newBatteryId"
            placeholder="VD: BAT123"
            value={formData.newBatteryId}
            onChange={handleChange}
            aria-invalid={!!errors.newBatteryId}
            disabled={submitting}
          />
          {errors.newBatteryId && <div className="error">{errors.newBatteryId}</div>}
        </div>

        <div className="form-row">
          <label htmlFor="fee">Phí (VND)</label>
          <div className="fee-input-wrap">
            <input
              id="fee"
              name="fee"
              type="text"
              inputMode="numeric"
              placeholder="VD: 50000"
              value={formatNumber(formData.fee)}
              onChange={(e) => {
                const raw = normalizeNumberInput(e.target.value);
                handleChange({
                  ...e,
                  target: { ...e.target, name: "fee", value: raw },
                } as any);
              }}
              aria-invalid={!!errors.fee}
              disabled={submitting}
            />
            <span className="fee-currency">VND</span>
          </div>
          {errors.fee && <div className="error">{errors.fee}</div>}
        </div>

        <div className="form-row">
          <label htmlFor="status">Trạng thái</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            disabled={submitting}
          >
            <option value="inProgress">Đang xử lý</option>
            <option value="completed">Hoàn thành</option>
            <option value="failed">Thất bại</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit" disabled={submitting}>
            {submitting ? "Đang gửi..." : "Gửi"}
          </button>
        </div>
      </form>
    </div>
  );
};
