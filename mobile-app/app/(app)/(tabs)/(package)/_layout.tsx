import { Stack } from "expo-router";

export default function PackageLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Gói thuê pin",
        }}
      />
      <Stack.Screen
        name="order"
        options={{headerTitle: "Chi tiết đơn hàng"}}
      />
    </Stack>
  );
}
