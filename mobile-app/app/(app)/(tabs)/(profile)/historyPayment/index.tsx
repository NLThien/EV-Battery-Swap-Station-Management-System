import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

import Header from "@/components/header";
import { useAuth } from "@/constants/authContext";
import { PaymentAPI, Transaction } from "@/api/paymentService";

function HistoryPaymentScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("vi-VN") + " đ";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString("vi-VN") +
      " " +
      date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
    );
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "PAID":
        return { text: "Thành công", color: "text-green-600", bg: "bg-green-100" };
      case "PENDING":
        return { text: "Chờ thanh toán", color: "text-yellow-600", bg: "bg-yellow-100" };
      case "FAILED":
        return { text: "Thất bại", color: "text-red-600", bg: "bg-red-100" };
      default:
        return { text: status, color: "text-gray-600", bg: "bg-gray-100" };
    }
  };

  const fetchHistory = async () => {
    if (!user?.id) return;
    try {
      const data = await PaymentAPI.getTransactionHistory(user.id);

      if (data?.transactions) {
        setTransactions(data.transactions);
      }
    } catch (error) {
      console.log("Lỗi lấy lịch sử:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      setLoading(true);
      fetchHistory();
    }
  }, [user]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchHistory();
  };

  const onPressBack = () => {
    router.back();
  };

  // --- Render Item ---

  const renderItem = ({ item }: { item: Transaction }) => {
    const statusInfo = getStatusInfo(item.status);

    return (
      <TouchableOpacity
        className="bg-white p-4 mb-3 rounded-xl border border-gray-100 shadow-sm"
        onPress={() => {
          router.push({
            pathname: "./[id]",
            params: { 
                id: item.id,
                data: JSON.stringify(item) 
            },
          });
        }}
      >
        <View className="flex-row justify-between items-center mb-2">
          <View className="flex-col">
            <Text className="text-gray-500 text-xs">Mã đơn hàng</Text>
            <Text className="text-text font-bold text-base">
              {item.orderId.substring(0, 8)}...
            </Text>
          </View>
          <Text className="text-primary font-bold text-lg text-blue-600">
            {formatCurrency(item.amount)}
          </Text>
        </View>

        <View className="h-[1px] bg-gray-100 my-2" />

        <View className="flex-row justify-between items-center">
          <Text className="text-gray-400 text-sm">
            {formatDate(item.createdAt)}
          </Text>

          <View className={`px-3 py-1 rounded-full ${statusInfo.bg}`}>
            <Text className={`text-xs font-semibold ${statusInfo.color}`}>
              {statusInfo.text}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1">
        <Header
          iconLeft="chevron-left"
          onPressIconLeft={onPressBack}
          title="Lịch sử giao dịch"
        />

        <View className="flex-1 px-4 mt-4 bg-gray-50">
          {loading && !refreshing ? (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : (
            <FlatList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              ListEmptyComponent={
                <View className="flex-1 justify-center items-center mt-20">
                  <Text className="text-gray-400 text-base">
                    Chưa có giao dịch nào
                  </Text>
                </View>
              }
            />
          )}
        </View>
      </View>
    </View>
  );
}

export default HistoryPaymentScreen;