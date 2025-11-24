import { Stack } from "expo-router";

function UpdatePasswordLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerTitle: "Đổi mật khẩu", headerShown: false }}
      />
    </Stack>
  );
}

export default UpdatePasswordLayout;
