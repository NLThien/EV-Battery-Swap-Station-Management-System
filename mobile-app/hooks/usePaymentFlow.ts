import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
// import { apiClient } from ''; import api client

const PAYMENT_CHECK_INTERVAL = 5000; // 5 giây

interface UsePaymentFlowProps {
  orderId: string;
  onSuccess: (orderId: string) => void;
  onFailure: () => void;
}

/**
 * Hook này quản lý toàn bộ luồng polling để kiểm tra trạng thái thanh toán.
 * @param orderId - ID của đơn hàng cần kiểm tra.
 * @param onSuccess - Callback được gọi khi thanh toán thành công.
 * @param onFailure - Callback được gọi khi thanh toán thất bại.
 * @returns Trạng thái văn bản để hiển thị cho người dùng.
 */
export function usePaymentFlow({ orderId, onSuccess, onFailure }: UsePaymentFlowProps) {
  const [statusText, setStatusText] = useState('Vui lòng quét mã QR để thanh toán...');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!orderId) {
      setStatusText('Lỗi: Không có mã đơn hàng.');
      return;
    }

    const checkPaymentStatus = async () => {
      try {
        const { data } = await apiClient.get(`/orders/${orderId}/status`);
        
        if (data.status === 'PAID') {
          setStatusText('Thanh toán thành công!');
          if (intervalRef.current) clearInterval(intervalRef.current);
          onSuccess(orderId); // Gọi callback thành công
        } else if (data.status === 'FAILED') {
          setStatusText('Thanh toán đã thất bại.');
          if (intervalRef.current) clearInterval(intervalRef.current);
          onFailure(); // Gọi callback thất bại
        }
        // Nếu là 'PENDING', không làm gì, tiếp tục polling
      } catch (error) {
        console.error('Lỗi khi kiểm tra trạng thái thanh toán:', error);
        // Có thể thêm logic để dừng polling sau một số lần lỗi nhất định
      }
    };

    // Bắt đầu polling
    intervalRef.current = setInterval(checkPaymentStatus, PAYMENT_CHECK_INTERVAL);

    // Dọn dẹp: Dừng polling khi component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [orderId, onSuccess, onFailure]); // Dependencies

  return { statusText };
}