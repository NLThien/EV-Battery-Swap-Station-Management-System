import { useAuth } from "@/constants/authContext";
import { Redirect, Stack } from "expo-router";
import { Text } from "react-native";

export default function AppLayout() {
  const { token, loading } = useAuth();
  if (loading) return <Text>Loading...</Text>;
  if (!token) return <Redirect href="/(auth)/log-in" />;
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
