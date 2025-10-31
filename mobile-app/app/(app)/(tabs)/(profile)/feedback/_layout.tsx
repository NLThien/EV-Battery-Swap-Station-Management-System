import { Stack } from "expo-router";

export default function FeedbackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Phản hồi" }} />
      <Stack.Screen name="create" options={{ title: "Gửi phản hồi" }} />
      <Stack.Screen name="[id]" options={{ title: "Chi tiết phản hồi" }} />
    </Stack>
  );
}
