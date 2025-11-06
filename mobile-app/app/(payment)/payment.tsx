import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { usePaymentFlow } from '../../hooks/usePaymentFlow';
import QRCodeDisplay from '../../components/Payment/QRCodeDisplay';

const TRANSACTION_TIMEOUT_SECONDS = 300; // 5 phút

export default function PaymentScreen() {
  const router = useRouter();
  const { paymentUrl, orderId, amount } = useLocalSearchParams<{ paymentUrl: string; orderId: string; amount: string }>();
  
  const [timeLeft, setTimeLeft] = useState(TRANSACTION_TIMEOUT_SECONDS);

  // Sử dụng hook để xử lý logic polling
  const { statusText } = usePaymentFlow({
    orderId,
    onSuccess: (completedOrderId) => {
      router.replace({ pathname: '../payment-success', params: { orderId: completedOrderId, amount } });
    },
    onFailure: () => {
      router.replace('../payment-failure');
    },
  });

  // Logic đồng hồ đếm ngược
  useEffect(() => {
    if (timeLeft === 0) {
      router.replace('../payment-failure');
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime > 0 ? prevTime - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, router]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Thanh toán Đơn hàng</Text>

      <View style={styles.card}>
        <Text style={styles.timerText}>
          Giao dịch sẽ hết hạn sau: {formatTime(timeLeft)}
        </Text>
        
        <QRCodeDisplay uri={paymentUrl} />

        <Text style={styles.amount}>{Number(amount).toLocaleString()} VNĐ</Text>
        
        <Text style={styles.statusText}>{statusText}</Text>
      </View>

      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsTitle}>Hướng dẫn thanh toán</Text>
        <Text style={styles.instructionText}>1. Mở ứng dụng Ngân hàng hoặc Ví điện tử.</Text>
        <Text style={styles.instructionText}>2. Chọn tính năng quét mã QR (VietQR).</Text>
        <Text style={styles.instructionText}>3. Quét mã ở trên và xác nhận thanh toán.</Text>
      </View>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.cancelText}>Hủy giao dịch</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    padding: 20, 
    backgroundColor: '#F0FDF4',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#15803D',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  timerText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#B91C1C',
    marginBottom: 15,
  },
  amount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#16A34A',
    marginTop: 20,
  },
  statusText: {
    fontSize: 16,
    color: '#4B5563',
    marginTop: 10,
  },
  instructionsContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#E0F2F1',
    borderRadius: 8,
    width: '100%',
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#047857',
  },
  instructionText: {
    fontSize: 14,
    color: '#065F46',
    lineHeight: 22,
  },
  cancelText: {
    marginTop: 30,
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '500',
  },
});