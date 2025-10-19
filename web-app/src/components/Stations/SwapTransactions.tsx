import { useEffect, useState } from 'react';
import { getAllTransactions } from '../../services/stations/transactionService';
import { TransactionForm } from './TransactionForm';
import '../../styles/SwapTransactions.css';

export type Transaction = {
  id: string;
  driverName: string;
  batteryReturned: string;
  batteryIssued: string;
  payment: string;
  time: string;
};

const SwapTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const data = await getAllTransactions();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTransactions();
  }, []);

  if (loading) return <p>Loading transactions...</p>;

  return (
    <div className="swap-transactions">
      <TransactionForm onTransactionAdded={(newTx) => setTransactions([newTx, ...transactions])} />
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Driver</th>
            <th>Battery Returned</th>
            <th>Battery Issued</th>
            <th>Payment</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id}>
              <td>{tx.id}</td>
              <td>{tx.driverName}</td>
              <td>{tx.batteryReturned}</td>
              <td>{tx.batteryIssued}</td>
              <td>{tx.payment}</td>
              <td>{tx.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SwapTransactions;
