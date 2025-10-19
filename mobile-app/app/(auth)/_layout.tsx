import { useAuth } from "@/constants/authContext";
import { Redirect, Stack } from "expo-router";
import { Text } from "react-native";

export default function AuthLayout() {
  const { token, loading } = useAuth();
  if (loading) return <Text>Loading...</Text>;
  if (token) return <Redirect href="/(app)/(tabs)" />;
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="log-in" />
      <Stack.Screen name="register" options={{ presentation: "modal" }} />
    </Stack>
  );
}
