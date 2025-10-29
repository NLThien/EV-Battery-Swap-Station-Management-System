import React from 'react';
import { View, Button, StyleSheet, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { usePaymentFlow } from '../../hooks/usePaymentFlow';
import QRCodeDisplay from '../../components/Payment/QRCodeDisplay';
import PaymentStatusIndicator from '../../components/Payment/PaymentStatusIndicator';

export default function PaymentScreen() {
  const router = useRouter();
  const { paymentUrl, orderId } = useLocalSearchParams<{ paymentUrl: string; orderId: string }>();

  // Sử dụng hook để xử lý logic
  const { statusText } = usePaymentFlow({
    orderId,
    onSuccess: (completedOrderId) => {
      router.replace({ pathname: '/payment-success', params: { orderId: completedOrderId } });
    },
    onFailure: () => {
      router.replace('/payment-failure');
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <QRCodeDisplay uri={paymentUrl} />
      <PaymentStatusIndicator text={statusText} />
      <Button title="Hủy" onPress={() => router.back()} color="red" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: 'white' },
});