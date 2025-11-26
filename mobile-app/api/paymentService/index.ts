import apiClient from "@/lib/apiClient";

export interface Transaction {
  id: string;
  orderId: string;
  amount: number;
  status: "PENDING" | "PAID" | "FAILED";
  gatewayTxnRef: string;
  createdAt: string;
}

export interface HistoryResponse {
  transactions: Transaction[];
}

export const PaymentAPI = {
  // Lấy lịch sử giao dịch
  getTransactionHistory: async (userId: string) => {
    const response = await apiClient.get<HistoryResponse>("/payment/transactions", {
      headers: {
        "X-User-Role": "USER",
        "X-User-Id": userId,
      },
    });
    return response.data;
  },

  // Giả lập thanh toán thành công (Dev mode)
  simulateSuccess: async (orderId: string) => {
    const response = await apiClient.get(`/payment/simulate-success?orderId=${orderId}`);
    return response.data;
  }
};