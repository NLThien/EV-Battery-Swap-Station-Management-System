import { Stack } from "expo-router";

function FeedbackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="createFeedback"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

export default FeedbackLayout;
