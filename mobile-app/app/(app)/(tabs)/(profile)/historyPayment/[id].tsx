import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import Header from "@/components/header";

interface Transaction {
  id: string;
  orderId: string;
  amount: number;
  status: "PENDING" | "PAID" | "FAILED";
  gatewayTxnRef: string;
  createdAt: string;
  stationId?: string;
  transactionDate?: string;
}

export default function TransactionDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const transaction: Transaction | null = params.data
    ? JSON.parse(params.data as string)
    : null;

  const onPressBack = () => {
    router.back();
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("vi-VN") + " đ";
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return (
      date.toLocaleDateString("vi-VN") +
      " - " +
      date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
    );
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "PAID":
        return {
          text: "Thành công",
          color: "text-green-600",
          bg: "bg-green-50",
          border: "border-green-200",
        };
      case "PENDING":
        return {
          text: "Chờ thanh toán",
          color: "text-yellow-600",
          bg: "bg-yellow-50",
          border: "border-yellow-200",
        };
      case "FAILED":
        return {
          text: "Thất bại",
          color: "text-red-600",
          bg: "bg-red-50",
          border: "border-red-200",
        };
      default:
        return {
          text: status,
          color: "text-gray-600",
          bg: "bg-gray-50",
          border: "border-gray-200",
        };
    }
  };

  // --- Render khi không có dữ liệu ---
  if (!transaction) {
    return (
      <View className="flex-1 bg-white">
        <Header
          iconLeft="chevron-left"
          onPressIconLeft={onPressBack}
          title="Chi tiết"
        />
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">
            Không tìm thấy thông tin giao dịch.
          </Text>
        </View>
      </View>
    );
  }

  const statusInfo = getStatusInfo(transaction.status);

  return (

    <View className="flex-1 bg-white">
      <View className="flex-1">
        <Header
          iconLeft="chevron-left"
          onPressIconLeft={onPressBack}
          title="Chi tiết giao dịch"
        />

        <ScrollView
          className="flex-1 px-4 mt-4"
          showsVerticalScrollIndicator={false}
        >
          <View className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm items-center mb-6">
            <Text className="text-gray-500 text-sm mb-2 uppercase tracking-widest">
              Tổng thanh toán
            </Text>
            <Text className="text-4xl font-bold text-blue-600 mb-4">
              {formatCurrency(transaction.amount)}
            </Text>

            <View
              className={`px-4 py-2 rounded-full border ${statusInfo.bg} ${statusInfo.border}`}
            >
              <Text className={`font-bold text-sm ${statusInfo.color}`}>
                {statusInfo.text}
              </Text>
            </View>
          </View>

          <View className="bg-gray-50 p-5 rounded-2xl space-y-4 gap-4 mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-2">
              Thông tin đơn hàng
            </Text>

            <View className="flex-row justify-between items-start">
              <Text className="text-gray-500 mt-1">Mã đơn hàng</Text>
              <Text className="text-gray-800 font-medium text-right flex-1 ml-4 select-text">
                {transaction.orderId}
              </Text>
            </View>

            <View className="flex-row justify-between items-start">
              <Text className="text-gray-500 mt-1">Mã tham chiếu</Text>
              <Text className="text-gray-800 font-medium text-right flex-1 ml-4 select-text">
                {transaction.gatewayTxnRef}
              </Text>
            </View>

            <View className="flex-row justify-between items-start">
              <Text className="text-gray-500">Trạm sạc</Text>
              <Text className="text-gray-800 font-medium text-right">
                {transaction.stationId || "N/A"}
              </Text>
            </View>

            <View className="h-[1px] bg-gray-200 my-1" />

            <View className="flex-row justify-between items-start">
              <Text className="text-gray-500">Thời gian tạo</Text>
              <Text className="text-gray-800 font-medium text-right">
                {formatDate(transaction.createdAt)}
              </Text>
            </View>

            {transaction.transactionDate && (
              <View className="flex-row justify-between items-start">
                <Text className="text-gray-500">Thanh toán lúc</Text>
                <Text className="text-gray-800 font-medium text-right">
                  {transaction.transactionDate}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}