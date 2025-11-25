import { useEffect, useState } from "react";
import axios from "axios";
import "./SwapTransactions.css";
import { TransactionForm } from "./TransactionForm";

export type SwapTransaction = {
  id?: number;
  driverId: string;
  stationId: string;
  oldBatteryId: string;
  newBatteryId: string;
  fee: number;
  timestamp: string;
  status: "completed" | "inProgress" | "failed";
};

const API_URL = "http://localhost:8082/api/transactions"; 

const SwapTransactions = () => {
  const [transactions, setTransactions] = useState<SwapTransaction[]>([]);
  const [showForm, setShowForm] = useState(false);

  //Lấy danh sách giao dịch từ MySQL khi load trang
  useEffect(() => {
    axios
      .get<SwapTransaction[]>(API_URL)
      .then((res) => setTransactions(res.data))
  }, []);

  //Hàm thêm giao dịch mới (POST -> MySQL)
  const handleAddTransaction = async (data: Omit<SwapTransaction, "id" | "timestamp">) => {
    
      const newTx: SwapTransaction = {
        ...data,
        timestamp: new Date().toISOString(),
      };

      const res = await axios.post<SwapTransaction>(API_URL, newTx);
      setTransactions((prev) => [res.data, ...prev]); // cập nhật state ngay
      setShowForm(false);
    
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    await axios.delete(`${API_URL}/${id}`);
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  const formatCurrency = (amount: number) =>
    amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  return (
    <div className="transactions-page">
      <h1>Swap Transactions Management</h1>
      <p>Trang quản lý giao dịch đổi pin.</p>

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
            <th>ID</th>
            <th>Driver</th>
            <th>Station</th>
            <th>Old Battery</th>
            <th>New Battery</th>
            <th>Fee (VND)</th>
            <th>Time</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id}>
              <td>{tx.id}</td>
              <td>{tx.driverId}</td>
              <td>{tx.stationId}</td>
              <td>{tx.oldBatteryId}</td>
              <td>{tx.newBatteryId}</td>
              <td>{formatCurrency(tx.fee)}</td>
              <td>{new Date(tx.timestamp).toLocaleString()}</td>
              <td>
                <span
                  className={`status-tag ${
                    tx.status === "completed"
                      ? "success"
                      : tx.status === "inProgress"
                      ? "pending"
                      : "failed"
                  }`}
                >
                  {tx.status}
                </span>
              </td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(tx.id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default SwapTransactions;
