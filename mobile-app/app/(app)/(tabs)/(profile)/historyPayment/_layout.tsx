import { Stack } from "expo-router";

export default function HistoryPaymentLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Lịch sử thanh toán" }} />
      
      <Stack.Screen name="[id]" options={{ title: "Chi tiết thanh toán" }}/>
    </Stack>
  );
}