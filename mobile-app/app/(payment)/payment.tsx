import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ActivityIndicator
} from 'react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Import đúng đường dẫn theo ảnh của bạn
import { usePaymentFlow } from '../../hooks/usePaymentFlow';
import QRCodeDisplay from '../../components/Payment/QRCodeDisplay';
import PaymentStatusIndicator from '../../components/Payment/PaymentStatusIndicator';

const TRANSACTION_TIMEOUT_SECONDS = 300; // 5 phút

export default function PaymentScreen() {
  const router = useRouter();
  // Lấy tham số truyền sang từ màn hình Order
  const { paymentUrl, orderId, amount } = useLocalSearchParams<{ paymentUrl: string; orderId: string; amount: string }>();
  
  const [timeLeft, setTimeLeft] = useState(TRANSACTION_TIMEOUT_SECONDS);

  // Sử dụng Hook custom của bạn
  const { statusText } = usePaymentFlow({
    orderId,
    onSuccess: (completedOrderId) => {
      // Chuyển sang màn hình thành công
      router.replace({ 
        pathname: '/(payment)/payment-success', 
        params: { orderId: completedOrderId, amount } 
      });
    },
    onFailure: () => {
      // Chuyển sang màn hình thất bại
      router.replace('/(payment)/payment-failure');
    },
  });

  // Logic đếm ngược thời gian
  useEffect(() => {
    if (timeLeft === 0) {
      router.replace('/(payment)/payment-failure');
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((t) => t > 0 ? t - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, router]);

  // Format thời gian mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thanh Toán QR</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
           <Ionicons name="close" size={24} color="#4B5563" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Đồng hồ đếm ngược */}
        <View style={styles.timerContainer}>
           <Text style={styles.timerLabel}>Đơn hàng hết hạn sau</Text>
           <Text style={styles.timerValue}>{formatTime(timeLeft)}</Text>
        </View>

        {/* Thẻ chứa QR Code */}
        <View style={styles.qrCard}>
          <View style={styles.qrWrapper}>
            {paymentUrl ? (
              // Component hiển thị QR của bạn
              <QRCodeDisplay uri={paymentUrl} />
            ) : (
              <View style={{height: 200, justifyContent: 'center'}}>
                <ActivityIndicator size="large" color="#16A34A" />
                <Text style={{marginTop: 10, color: 'gray'}}>Đang tạo mã QR...</Text>
              </View>
            )}
          </View>
          
          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>Số tiền thanh toán</Text>
            <Text style={styles.amountValue}>
              {amount ? Number(amount).toLocaleString() : '0'} đ
            </Text>
          </View>

          {/* Component hiển thị trạng thái của bạn */}
          <View style={styles.statusWrapper}>
            <PaymentStatusIndicator text={statusText} /> 
          </View>
        </View>

        <View style={styles.guide}>
          <Text style={styles.guideTitle}>Hướng dẫn:</Text>
          <Text style={styles.guideText}>1. Mở App Ngân hàng / Ví điện tử.</Text>
          <Text style={styles.guideText}>2. Quét mã QR ở trên.</Text>
          <Text style={styles.guideText}>3. Hệ thống sẽ tự động xác nhận.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827' },
  closeButton: { position: 'absolute', right: 16, top: 16 },
  content: { flex: 1, padding: 20, alignItems: 'center' },
  
  timerContainer: { alignItems: 'center', marginBottom: 20 },
  timerLabel: { fontSize: 14, color: '#6B7280' },
  timerValue: { fontSize: 24, fontWeight: 'bold', color: '#DC2626' },

  qrCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 24,
  },
  qrWrapper: {
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  amountContainer: { alignItems: 'center', marginBottom: 16 },
  amountLabel: { fontSize: 14, color: '#6B7280' },
  amountValue: { fontSize: 28, fontWeight: 'bold', color: '#16A34A' },
  
  statusWrapper: {
    width: '100%',
    alignItems: 'center'
  },

  guide: { width: '100%' },
  guideTitle: { fontWeight: 'bold', marginBottom: 8, color: '#374151' },
  guideText: { color: '#4B5563', marginBottom: 4 },
});