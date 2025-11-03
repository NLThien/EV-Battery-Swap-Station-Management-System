import { useState } from "react";
import "./SwapTransactions.css";
import { TransactionForm } from "./TransactionForm";


// Định nghĩa kiểu dữ liệu
export type SwapTransaction = {
  swap_id: string;
  driver_id: string;
  station_id: string;
  old_battery_id: string;
  new_battery_id: string;
  fee: number;
  swap_time: string;
  status: "completed" | "in-progress" | "failed";
};

const SwapTransactions = () => {
  const [showForm, setShowForm] = useState(false);

  // Dữ liệu demo hiển thị UI
  const [transactions, setTransactions] = useState<SwapTransaction[]>([
  {
    swap_id: "SWAP001",
    driver_id: "DRV1001",
    station_id: "STA001",
    old_battery_id: "BAT001",
    new_battery_id: "BAT002",
    fee: 50000,
    swap_time: "2025-10-14T09:00:00",
    status: "completed",
  },
  {
    swap_id: "SWAP002",
    driver_id: "DRV1002",
    station_id: "STA002",
    old_battery_id: "BAT010",
    new_battery_id: "BAT020",
    fee: 60000,
    swap_time: "2025-10-14T11:30:00",
    status: "in-progress",
  },
  {
    swap_id: "SWAP003",
    driver_id: "DRV1003",
    station_id: "STA003",
    old_battery_id: "BAT011",
    new_battery_id: "BAT021",
    fee: 55000,
    swap_time: "2025-10-14T12:00:00",
    status: "completed",
  },
  // ...more unique entries
]);
  

  const formatCurrency = (amount: number) =>
    amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  // Thêm giao dịch mới vào state (demo)
  const handleAddTransaction = (data: Omit<SwapTransaction, 'swap_id' | 'swap_time'>) => {
    const newTx: SwapTransaction = {
      swap_id: `SWAP${Date.now()}`,
      swap_time: new Date().toISOString(),
      ...data,
    };
    setTransactions((prev) => [newTx, ...prev]);
    setShowForm(false);
  };

  return (
    <div className="transactions-page">
      <h1>⚡ Swap Transactions Management</h1>
      <p>Trang quản lý giao dịch đổi pin - demo UI.</p>

        <button className="add-button" onClick={() => setShowForm(true)}>
          + Thêm giao dịch
        </button>

      <div className="transaction-summary">
        <p>Tổng giao dịch: {transactions.length}</p>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Thêm giao dịch mới</h3>
            <TransactionForm onAdd={handleAddTransaction} />
            <div className="modal-actions">
              <button onClick={() => setShowForm(false)} className="cancel-btn">
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="transactions-table">
        <thead>
          <tr>
            <th>Swap ID</th>
            <th>Driver ID</th>
            <th>Station ID</th>
            <th>Old Battery</th>
            <th>New Battery</th>
            <th>Fee (VND)</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.swap_id}>
              <td>{tx.swap_id}</td>
              <td>{tx.driver_id}</td>
              <td>{tx.station_id}</td>
              <td>{tx.old_battery_id}</td>
              <td>{tx.new_battery_id}</td>
              <td>{formatCurrency(tx.fee)}</td>
              <td>{new Date(tx.swap_time).toLocaleString()}</td>
              <td>
                <span
                  className={`status-tag ${
                    tx.status === "completed"
                      ? "success"
                      : tx.status === "in-progress"
                      ? "pending"
                      : "failed"
                  }`}
                >
                  {tx.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SwapTransactions;
