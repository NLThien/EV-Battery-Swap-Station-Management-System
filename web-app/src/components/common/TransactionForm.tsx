import { useState } from 'react';
import type { SwapTransaction } from './SwapTransactions';

type Props = {
  onTransactionAdded: (tx: SwapTransaction) => void;
};

export const TransactionForm = ({ onTransactionAdded }: Props) => {
  const [form, setForm] = useState({
    driver_id: '',
    station_id: '',
    old_battery_id: '',
    new_battery_id: '',
    fee: 0,
    status: 'completed' as 'completed' | 'in-progress' | 'failed',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === 'fee' ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTx: SwapTransaction = {
      swap_id: `TX-${Date.now()}`,
      ...form,
      swap_time: new Date().toISOString(),
    };

    onTransactionAdded(newTx);

    setForm({
      driver_id: '',
      station_id: '',
      old_battery_id: '',
      new_battery_id: '',
      fee: 0,
      status: 'completed',
    });
  };

  return (
    <form
      className="transaction-form flex flex-col gap-3 p-4 bg-white shadow-md rounded-xl"
      onSubmit={handleSubmit}
    >
      <input
        name="driver_id"
        value={form.driver_id}
        onChange={handleChange}
        placeholder="Driver ID"
        className="border p-2 rounded"
        required
      />
      <input
        name="station_id"
        value={form.station_id}
        onChange={handleChange}
        placeholder="Station ID"
        className="border p-2 rounded"
        required
      />
      <input
        name="old_battery_id"
        value={form.old_battery_id}
        onChange={handleChange}
        placeholder="Old Battery ID"
        className="border p-2 rounded"
        required
      />
      <input
        name="new_battery_id"
        value={form.new_battery_id}
        onChange={handleChange}
        placeholder="New Battery ID"
        className="border p-2 rounded"
        required
      />
      <input
        name="fee"
        type="number"
        value={form.fee}
        onChange={handleChange}
        placeholder="Transaction Fee (VND)"
        className="border p-2 rounded"
        required
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="completed">Completed</option>
        <option value="in-progress">In Progress</option>
        <option value="failed">Failed</option>
      </select>

      <button
        type="submit"
        className="btn primary bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        ➕ Add Swap Transaction
      </button>
    </form>
  );
};
