import { useEffect, useState } from 'react';
import { getAllTransactions } from '../../services/stations/transactionService';
import { TransactionForm } from './TransactionForm';
import '../../styles/SwapTransactions.css';

export type SwapTransaction = {
  swap_id: string;
  driver_id: string;
  station_id: string;
  old_battery_id: string;
  new_battery_id: string;
  fee: number; // phí giao dịch
  swap_time: string;
  status: 'completed' | 'in-progress' | 'failed';
};

const SwapTransactions = () => {
  const [transactions, setTransactions] = useState<SwapTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getAllTransactions();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const formatCurrency = (amount: number) =>
    amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

  if (loading) return <p>Loading transactions...</p>;

  return (
    <div className="transactions-page">
      <h1>⚡ Swap Transactions Management</h1>
      <p>Handle and record all swap activities in real-time.</p>

      <TransactionForm
        onTransactionAdded={(newTx) => setTransactions([newTx, ...transactions])}
      />

      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
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
                <td>{tx.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SwapTransactions;
