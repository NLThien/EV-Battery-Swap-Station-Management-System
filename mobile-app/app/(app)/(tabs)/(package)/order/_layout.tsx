import { Stack } from "expo-router";

export default function OrderLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{headerTitle: "Chi tiết đơn hàng"}}
            />
        </Stack>
    );
}