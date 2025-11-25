import { Stack } from "expo-router";

export default function FeedbackLayout() {
  return (
    <Stack>
      {/* ✅ Tuyến đường index vẫn giữ nguyên */}
      <Stack.Screen name="index" options={{ title: "Phản hồi" }} />
      <Stack.Screen name="createFeedback" options={{ title: "Gửi phản hồi" }} />
      <Stack.Screen name="[id]" options={{ title: "Chi tiết phản hồi" }} />
    </Stack>
  );
}