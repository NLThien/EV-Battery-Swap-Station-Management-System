import { Stack } from 'expo-router';
import React from 'react';

export default function PaymentLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="payment" options={{ title: 'Thanh Toán' }} />
        
        <Stack.Screen name="payment-success" options={{ title: 'Thanh Toán Thành Công' }} />
        
        <Stack.Screen name="payment-failure" options={{ title: 'Thanh Toán Thất Bại' }} />
    </Stack>
  );
}