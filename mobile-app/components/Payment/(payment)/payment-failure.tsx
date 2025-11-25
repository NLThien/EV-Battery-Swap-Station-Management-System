import React from 'react';
import { useRouter } from 'expo-router';
import TransactionResult from '../TransactionResult';

export default function PaymentFailureScreen() {
  const router = useRouter();

  return (
    <TransactionResult
      status="failure"
      title="Thanh toán Thất bại!"
      message="Đã có lỗi xảy ra hoặc bạn đã hủy giao dịch."
      buttonTitle="Thử lại"
      onButtonPress={() => router.back()}
    />
  );
}