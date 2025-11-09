import React from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import TransactionResult from '../../components/Payment/TransactionResult';

export default function PaymentSuccessScreen() {
  const router = useRouter();
  const { orderId } = useLocalSearchParams<{ orderId: string }>();

  return (
    <TransactionResult
      status="success"
      title="Thanh toán Thành công!"
      message={`Mã đơn hàng của bạn: ${orderId}`}
      buttonTitle="Đóng"
      onButtonPress={() => router.back()}
    />
  );
}