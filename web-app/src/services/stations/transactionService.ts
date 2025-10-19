import axios from 'axios';

const API_URL = 'http://localhost:3000/SwapTransactions';

export const getAllTransactions = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addTransaction = async (transaction: any) => {
  const res = await axios.post(API_URL, transaction);
  return res.data;
};

export const updateTransaction = async (id: string, data: any) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteTransaction = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
