import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Trang chủ' }} />
      <Stack.Screen name="booking" options={{ title: 'Đặt lịch' }} />
      <Stack.Screen name="bookings" options={{ title: 'Lịch của tôi' }} />
    </Stack>
  );
}