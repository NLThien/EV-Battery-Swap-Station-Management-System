import { Stack } from 'expo-router';
import React from 'react';

export default function PaymentLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="payment" options={{ title: 'Thanh Toán' }} />
        
        <Stack.Screen name="payment-success" options={{ title: 'Kết Quả' }} />
        
        <Stack.Screen name="payment-failure" options={{ title: 'Thất Bại' }} />

        <Stack.Screen name="transaction" options={{ title: 'Chi tiết giao dịch' }} />
    </Stack>
  );
}