import { Stack } from 'expo-router';
import React from 'react';

export default function PaymentLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="payment" options={{ title: 'Thanh Toán' }} />
        
        <Stack.Screen name="TransactionResult" options={{ title: 'Kết Quả Thanh Toán' }} />
    </Stack>
  );
}