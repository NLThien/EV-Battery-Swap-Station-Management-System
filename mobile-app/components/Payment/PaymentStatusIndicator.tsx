import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  status?: "PENDING" | "PAID" | "FAILED" | string;
  text?: string;
}

export default function PaymentStatusIndicator({ status, text }: Props) {
  // Mặc định
  let iconName: keyof typeof Ionicons.glyphMap = "time";
  let color = "text-gray-500";
  let bgColor = "bg-gray-200";

  // Logic theo trạng thái hoặc text
  if (status === "PAID" || text?.includes("thành công")) {
    iconName = "checkmark-circle";
    color = "text-green-600";
    bgColor = "bg-green-100";
  } else if (status === "FAILED" || text?.includes("thất bại") || text?.includes("Lỗi")) {
    iconName = "alert-circle";
    color = "text-red-600";
    bgColor = "bg-red-100";
  } else {
    // PENDING hoặc đang chờ
    return (
      <View className="flex-row items-center px-4 py-2 rounded-2xl bg-blue-100 mt-2 gap-2">
        <ActivityIndicator size="small" color="#0284C7" />
        <Text className="text-blue-600 font-semibold text-sm">
          {text || "Đang chờ thanh toán..."}
        </Text>
      </View>
    );
  }

  return (
    <View className={`flex-row items-center px-4 py-2 rounded-2xl mt-2 gap-2 ${bgColor}`}>
      <Ionicons name={iconName} size={20} color={color.replace("text-", "#")} />
      <Text className={`font-semibold text-sm ${color}`}>{text || status}</Text>
    </View>
  );
}
