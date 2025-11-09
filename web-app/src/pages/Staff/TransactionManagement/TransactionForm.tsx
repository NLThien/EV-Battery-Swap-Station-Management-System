import React, { useState } from "react";
import "./TransactionForm.css";

type Status = "in-progress" | "completed" | "failed";

interface TransactionFormData {
  driver_id: string;
  station_id: string;
  old_battery_id: string;
  new_battery_id: string;
  fee: string; // store as string for easy editing, convert on submit
  status: Status;
}

export interface TransactionFormProps {
  onAdd?: (data: {
    driver_id: string;
    station_id: string;
    old_battery_id: string;
    new_battery_id: string;
    fee: number;
    status: Status;
  }) => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onAdd }) => {
  const [formData, setFormData] = useState<TransactionFormData>({
    driver_id: "",
    station_id: "",
    old_battery_id: "",
    new_battery_id: "",
    fee: "",
    status: "in-progress",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof TransactionFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const formatNumber = (value: string) => {
    if (!value) return "";
    const n = Number(value.replace(/[^0-9.-]/g, ""));
    if (Number.isNaN(n)) return value;
    return n.toLocaleString("en-US");
  };

  const normalizeNumberInput = (value: string) => {
    // remove non-digit characters except dot
    return value.replace(/[^\d.]/g, "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "fee") {
      const normalized = normalizeNumberInput(value);
      setFormData((s) => ({ ...s, [name]: normalized } as any));
    } else {
      setFormData((s) => ({ ...s, [name]: value } as any));
    }
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setMessage(null);
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof TransactionFormData, string>> = {};
    if (!formData.driver_id.trim()) newErrors.driver_id = "Vui lòng nhập Driver ID";
    if (!formData.station_id.trim()) newErrors.station_id = "Vui lòng nhập Station ID";
    if (!formData.new_battery_id.trim()) newErrors.new_battery_id = "Vui lòng nhập New Battery ID";
    const feeNum = Number(formData.fee);
    if (!formData.fee || Number.isNaN(feeNum) || feeNum <= 0) newErrors.fee = "Phí phải là số lớn hơn 0";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setSubmitting(true);

    // Demo: simulate API call
    setTimeout(() => {
      const payloadForParent = {
        driver_id: formData.driver_id,
        station_id: formData.station_id,
        old_battery_id: formData.old_battery_id,
        new_battery_id: formData.new_battery_id,
        fee: Number(formData.fee),
        status: formData.status,
      };
      console.log("Submitted transaction (demo):", payloadForParent);

      // notify parent so it can insert the transaction into the table
      try {
        onAdd && onAdd(payloadForParent);
      } catch (err) {
        console.warn("onAdd handler threw:", err);
      }

      setMessage("Gửi thành công (demo). Dữ liệu đã được ghi vào console.");
      setSubmitting(false);
      // optional: reset
      setFormData({
        driver_id: "",
        station_id: "",
        old_battery_id: "",
        new_battery_id: "",
        fee: "",
        status: "in-progress",
      });
    }, 700);
  };

  return (
    <div className="transaction-form" aria-live="polite">
      <header className="tf-header">
        <h2>🧾 Thêm giao dịch mới</h2>
        <p className="tf-sub">Form demo — thay đổi giao diện, validate & accessibility</p>
      </header>

      <form onSubmit={handleSubmit} className="form-grid" noValidate>
        <div className="form-row">
          <label htmlFor="driver_id">Driver ID</label>
          <input
            id="driver_id"
            name="driver_id"
            placeholder="VD: DRV-001"
            value={formData.driver_id}
            onChange={handleChange}
            aria-invalid={!!errors.driver_id}
            aria-describedby={errors.driver_id ? "err-driver" : undefined}
            disabled={submitting}
            autoComplete="off"
          />
          {errors.driver_id && (
            <div id="err-driver" className="error" role="alert">
              {errors.driver_id}
            </div>
          )}
        </div>

        <div className="form-row">
          <label htmlFor="station_id">Station ID</label>
          <input
            id="station_id"
            name="station_id"
            placeholder="VD: ST-01"
            value={formData.station_id}
            onChange={handleChange}
            aria-invalid={!!errors.station_id}
            aria-describedby={errors.station_id ? "err-station" : undefined}
            disabled={submitting}
            autoComplete="off"
          />
          {errors.station_id && (
            <div id="err-station" className="error" role="alert">
              {errors.station_id}
            </div>
          )}
        </div>

        <div className="form-row">
          <label htmlFor="old_battery_id">Old Battery ID</label>
          <input
            id="old_battery_id"
            name="old_battery_id"
            placeholder="(nếu có)"
            value={formData.old_battery_id}
            onChange={handleChange}
            disabled={submitting}
            autoComplete="off"
          />
        </div>

        <div className="form-row">
          <label htmlFor="new_battery_id">New Battery ID</label>
          <input
            id="new_battery_id"
            name="new_battery_id"
            placeholder="VD: BAT-123"
            value={formData.new_battery_id}
            onChange={handleChange}
            aria-invalid={!!errors.new_battery_id}
            aria-describedby={errors.new_battery_id ? "err-newbattery" : undefined}
            disabled={submitting}
            autoComplete="off"
          />
          {errors.new_battery_id && (
            <div id="err-newbattery" className="error" role="alert">
              {errors.new_battery_id}
            </div>
          )}
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
                // when user types, normalize then set raw digits
                const raw = normalizeNumberInput(e.target.value);
                handleChange({
                  ...e,
                  target: { ...e.target, name: "fee", value: raw },
                } as any);
              }}
              aria-invalid={!!errors.fee}
              aria-describedby={errors.fee ? "err-fee" : undefined}
              disabled={submitting}
            />
            <span className="fee-currency">VND</span>
          </div>
          {errors.fee && (
            <div id="err-fee" className="error" role="alert">
              {errors.fee}
            </div>
          )}
        </div>

        <div className="form-row">
          <label htmlFor="status">Trạng thái</label>
          <select id="status" name="status" value={formData.status} onChange={handleChange} disabled={submitting}>
            <option value="in-progress">Đang xử lý</option>
            <option value="completed">Hoàn thành</option>
            <option value="failed">Thất bại</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit" disabled={submitting}>
            {submitting ? "Đang gửi..." : "Gửi (Demo)"}
          </button>
        </div>
      </form>

      {message && (
        <div className="submit-message" role="status">
          {message}
        </div>
      )}
    </div>
  );
};