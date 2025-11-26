import { useState, useEffect, useRef } from "react";
import  apiClient  from "../lib/apiClient";

const PAYMENT_CHECK_INTERVAL = 5000;

interface UsePaymentFlowProps {
  orderId: string;
  onSuccess: (orderId: string) => void;
  onFailure: () => void;
}

export function usePaymentFlow({ orderId, onSuccess, onFailure }: UsePaymentFlowProps) {
  const [statusText, setStatusText] = useState(
    "Vui lòng quét mã QR để thanh toán..."
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!orderId) {
      setStatusText("Lỗi: Không có mã đơn hàng.");
      return;
    }

    const checkPaymentStatus = async () => {
      try {
        const { data } = await apiClient.get(`/orders/${orderId}/status`);

        if (data.status === "PAID") {
          setStatusText("Thanh toán thành công!");
          if (intervalRef.current) clearInterval(intervalRef.current);
          intervalRef.current = null;
          onSuccess(orderId);
        } else if (data.status === "FAILED") {
          setStatusText("Thanh toán thất bại!");
          if (intervalRef.current) clearInterval(intervalRef.current);
          intervalRef.current = null;
          onFailure();
        }

        // PENDING → không làm gì
      } catch (error) {
        console.log("Polling error:", error);
      }
    };

    // chạy ngay 1 lần
    checkPaymentStatus();

    // bắt đầu polling
    intervalRef.current = setInterval(checkPaymentStatus, PAYMENT_CHECK_INTERVAL);

    // cleanup
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [orderId]);

  return { statusText };
}
