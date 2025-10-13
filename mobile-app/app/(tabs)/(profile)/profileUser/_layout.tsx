import { Stack } from "expo-router";

function ProfileUserLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{ headerTitle: "Profile User", headerShown: false }}
      />
    </Stack>
  );
}

export default ProfileUserLayout;
