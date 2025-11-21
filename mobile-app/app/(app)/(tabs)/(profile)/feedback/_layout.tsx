import { Stack } from "expo-router";

export default function FeedbackLayout() {
  return (
    <Stack>
      {/* ✅ Tuyến đường index vẫn giữ nguyên */}
      <Stack.Screen name="index" options={{ title: "Phản hồi" }} />
      
      {/* ❌ Sửa lỗi: Thay vì "create", phải là tên file thực tế "createFeedback" */}
      <Stack.Screen name="createFeedback" options={{ title: "Gửi phản hồi" }} /> 
      
      {/* Tuyến đường [id] vẫn giữ nguyên */}
      <Stack.Screen name="[id]" options={{ title: "Chi tiết phản hồi" }} />
    </Stack>
  );
}