import { useState } from 'react';
import type { Transaction } from './SwapTransactions';
import '../../styles/TransactionForm.css';

type Props = {
  onTransactionAdded: (tx: Transaction) => void;
};

export const TransactionForm = ({ onTransactionAdded }: Props) => {
  const [driverName, setDriverName] = useState('');
  const [batteryReturned, setBatteryReturned] = useState('');
  const [batteryIssued, setBatteryIssued] = useState('');
  const [payment, setPayment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTx: Transaction = {
      id: `TX${Date.now()}`,
      driverName,
      batteryReturned,
      batteryIssued,
      payment,
      time: new Date().toISOString(),
    };
    onTransactionAdded(newTx);
    setDriverName('');
    setBatteryReturned('');
    setBatteryIssued('');
    setPayment('');
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Driver Name"
        value={driverName}
        onChange={(e) => setDriverName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Battery Returned"
        value={batteryReturned}
        onChange={(e) => setBatteryReturned(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Battery Issued"
        value={batteryIssued}
        onChange={(e) => setBatteryIssued(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Payment"
        value={payment}
        onChange={(e) => setPayment(e.target.value)}
        required
      />
      <button type="submit" className="action-btn primary">➕ Add Transaction</button>
    </form>
  );
};
