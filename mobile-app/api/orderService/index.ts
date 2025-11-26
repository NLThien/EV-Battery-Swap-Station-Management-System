import apiClient from "@/lib/apiClient"; 

export interface OrderRequest {
  packageId: number | string;
  stationId: string;
}

export interface OrderResponse {
  orderId: string;
  packageType: string;
  amount: number;
  paymentUrl: string;
}

// 2. Các hàm gọi API
export const OrderAPI = {
  // Tạo đơn hàng
  createOrder: async (data: OrderRequest) => {
    const response = await apiClient.post<OrderResponse>("/api/orders", data);
    return response.data;
  },

  // Lấy trạng thái đơn hàng
  getOrderStatus: async (orderId: string) => {
    const response = await apiClient.get<{ status: string }>(`/api/orders/${orderId}/status`);
    return response.data;
  },

  // Lấy chi tiết đơn hàng (nếu cần sau này)
  getOrderDetail: async (orderId: string) => {
    const response = await apiClient.get(`/api/orders/${orderId}`);
    return response.data;
  }
};