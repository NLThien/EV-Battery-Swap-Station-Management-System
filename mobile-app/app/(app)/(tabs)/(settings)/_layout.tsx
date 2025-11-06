import { Stack } from "expo-router";

function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Settings" }} />
    </Stack>
  );
}

export default SettingsLayout;
