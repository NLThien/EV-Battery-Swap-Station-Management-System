import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function PaymentSuccessScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Ionicons name="checkmark-circle" size={100} color="#16A34A" />
      <Text className="text-3xl font-bold text-green-600 mt-6">Thanh toán thành công!</Text>
      <Text className="text-gray-600 text-center mt-2">
        Cảm ơn bạn đã hoàn tất thanh toán.
      </Text>

      <TouchableOpacity
        onPress={() => router.replace("../(package)")}
        className="mt-10 bg-green-600 px-8 py-3 rounded-full"
      >
        <Text className="text-white font-semibold text-lg">Quay về danh sách gói</Text>
      </TouchableOpacity>
    </View>
  );
}
