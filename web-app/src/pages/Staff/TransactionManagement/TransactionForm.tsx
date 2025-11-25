import React, { useEffect, useState } from "react";
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
  }) => Promise<any> | void;
}

const API_URL = "http://localhost:8082/api/transactions";
const INVENTORY_API = "http://localhost:8083/api/inventory";

type InventoryBattery = {
  id: string;
  model: string;
  capacity: string;
  chargeLevel: number;
  status: string;
  health: number;
  stationId: string;
};

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

  // Inventory state
  const [inventory, setInventory] = useState<InventoryBattery[]>([]);
  const [loadingInventory, setLoadingInventory] = useState(false);

  // old battery action after return
  const [oldBatteryAction, setOldBatteryAction] = useState<"none" | "maintenance" | "ready">("none");

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setLoadingInventory(true);
    try {
      const res = await axios.get<InventoryBattery[]>(INVENTORY_API);
      setInventory(res.data || []);
    } catch (err) {
      console.error("Không lấy được inventory:", err);
    } finally {
      setLoadingInventory(false);
    }
  };

  // Derived list: new batteries ready to use (100% charge)
  const readyNewBatteries = inventory.filter((b) => Number(b.chargeLevel) >= 100);

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
    if (!formData.newBatteryId.trim()) newErrors.newBatteryId = "Vui lòng chọn New Battery ID";
    const feeNum = Number(formData.fee);
    if (!formData.fee || Number.isNaN(feeNum) || feeNum <= 0) newErrors.fee = "Phí phải là số lớn hơn 0";
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

    const payloadForParent = {
      driverId: formData.driverId,
      stationId: formData.stationId,
      oldBatteryId: formData.oldBatteryId,
      newBatteryId: formData.newBatteryId,
      fee: Number(formData.fee),
      status: formData.status as Status,
    };

    setSubmitting(true);

    try {
      let createdTx: any = null;

      // If parent provided onAdd -> delegate creation to parent (avoid double post)
      if (onAdd) {
        const maybePromise = onAdd(payloadForParent);
        // If parent returned a promise that resolves to created tx, wait it.
        if (maybePromise && typeof (maybePromise as Promise<any>).then === "function") {
          createdTx = await (maybePromise as Promise<any>);
        }
      } else {
        // Post directly from this component (fallback)
        const postPayload = { ...payloadForParent, timestamp: new Date().toISOString() };
        const res = await axios.post(API_URL, postPayload);
        createdTx = res.data;
      }

      // If user selected an action for oldBattery, update inventory after transaction created
      if (oldBatteryAction !== "none" && formData.oldBatteryId) {
        try {
          const oldId = formData.oldBatteryId;
          // Find battery in fetched inventory
          const battery = inventory.find((b) => String(b.id) === String(oldId));
          if (battery) {
            // Map action to status value expected by inventory service (uppercase)
            const newStatus = oldBatteryAction === "maintenance" ? "MAINTENANCE" : "FULL";
            const updatedBattery = {
              ...battery,
              status: newStatus,
            };
            await axios.put(`${INVENTORY_API}/${oldId}`, updatedBattery);
            // refresh inventory
            await fetchInventory();
          } else {
            // If not in local inventory list, try to fetch single battery and update
            const singleRes = await axios.get(`${INVENTORY_API}/${oldId}`);
            if (singleRes?.data) {
              const updatedBattery = { ...singleRes.data, status: oldBatteryAction === "maintenance" ? "MAINTENANCE" : "FULL" };
              await axios.put(`${INVENTORY_API}/${oldId}`, updatedBattery);
              await fetchInventory();
            }
          }
        } catch (err) {
          console.error("Không cập nhật được trạng thái pin cũ:", err);
          setMessage("⚠️ Giao dịch tạo thành công nhưng không cập nhật được trạng thái pin trả về.");
        }
      }

      // Success path
      setMessage("✅ Giao dịch đã được tạo.");
      // reset form
      setFormData({
        driverId: "",
        stationId: "",
        oldBatteryId: "",
        newBatteryId: "",
        fee: "",
        status: "inProgress",
      });
      setOldBatteryAction("none");
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

        {/* Old battery: chọn từ inventory (có thể để trống) */}
        <div className="form-row">
          <label htmlFor="oldBatteryId">Old Battery ID (trả về)</label>
          <select
            id="oldBatteryId"
            name="oldBatteryId"
            value={formData.oldBatteryId}
            onChange={handleChange}
            disabled={submitting || loadingInventory}
          >
            <option value="">(Không chọn)</option>
            {inventory.map((b) => (
              <option key={b.id} value={b.id}>
                {b.id} — {b.model} — SoH: {b.health}% — {String(b.chargeLevel)}%
              </option>
            ))}
          </select>
        </div>

        {/* Old battery action after return */}
        <div className="form-row">
          <label htmlFor="oldAction">Hành động với pin trả về</label>
          <select
            id="oldAction"
            name="oldAction"
            value={oldBatteryAction}
            onChange={(e) => setOldBatteryAction(e.target.value as any)}
            disabled={submitting}
          >
            <option value="none">Không thay đổi</option>
            <option value="maintenance">Đánh dấu Bảo dưỡng</option>
            <option value="ready">Đánh dấu Sẵn sàng (FULL)</option>
          </select>
        </div>

        {/* New Battery: chỉ show những pin sẵn sàng (100%) */}
        <div className="form-row">
          <label htmlFor="newBatteryId">New Battery ID (thay thế) — chỉ pin 100%</label>
          <select
            id="newBatteryId"
            name="newBatteryId"
            value={formData.newBatteryId}
            onChange={handleChange}
            disabled={submitting || loadingInventory}
          >
            <option value="">-- Chọn pin đầy (100%) --</option>
            {readyNewBatteries.map((b) => (
              <option key={b.id} value={b.id}>
                {b.id} — {b.model} — SoH: {b.health}% — {String(b.chargeLevel)}%
              </option>
            ))}
          </select>
          {loadingInventory && <div className="muted">Đang tải danh sách pin...</div>}
          {readyNewBatteries.length === 0 && !loadingInventory && (
            <div className="muted">Không tìm thấy pin sẵn sàng (100%).</div>
          )}
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
          <label htmlFor="status">Trạng thái giao dịch</label>
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
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              // refresh inventory if dev wants to quickly reload
              fetchInventory();
              setMessage("Đã tải lại danh sách pin");
            }}
            disabled={submitting}
            style={{ marginLeft: 8 }}
          >
            Tải lại danh sách pin
          </button>
        </div>

        {message && <div className="info-message">{message}</div>}
      </form>
    </div>
  );
};
