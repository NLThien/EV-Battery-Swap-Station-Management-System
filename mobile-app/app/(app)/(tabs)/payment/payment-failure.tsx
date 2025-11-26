import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function PaymentFailureScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Ionicons name="close-circle" size={100} color="#DC2626" />
      <Text className="text-3xl font-bold text-red-600 mt-6">Thanh toán thất bại!</Text>
      <Text className="text-gray-600 text-center mt-2">
        Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.
      </Text>

      <TouchableOpacity
        onPress={() => router.replace("../(package)")}
        className="mt-10 bg-red-600 px-8 py-3 rounded-full"
      >
        <Text className="text-white font-semibold text-lg">Quay về danh sách gói</Text>
      </TouchableOpacity>
    </View>
  );
}
