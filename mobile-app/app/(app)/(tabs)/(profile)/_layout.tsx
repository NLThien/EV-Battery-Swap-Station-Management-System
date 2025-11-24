import { Stack } from "expo-router";

function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerTitle: "Profile", headerShown: false }}
      />
      <Stack.Screen
        name="profileUser"
        options={{ headerTitle: "Profile", headerShown: false }}
      />
      <Stack.Screen
        name="feedback"
        options={{ headerTitle: "feedback", headerShown: false }}
      />
      <Stack.Screen
        name="updatePassword"
        options={{ headerTitle: "Đổi mật khẩu", headerShown: false }}
      />
    </Stack>
  );
}

export default ProfileLayout;
