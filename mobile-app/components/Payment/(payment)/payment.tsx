import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { usePaymentFlow } from '../../../hooks/usePaymentFlow';
import QRCodeDisplay from '../QRCodeDisplay';
import PaymentStatusIndicator from '../PaymentStatusIndicator';

const TRANSACTION_TIMEOUT_SECONDS = 300; // 5 phút

export default function PaymentScreen() {
  const router = useRouter();
  const { paymentUrl, orderId, amount } = useLocalSearchParams<{ paymentUrl: string; orderId: string; amount: string }>();

  const [timeLeft, setTimeLeft] = useState(TRANSACTION_TIMEOUT_SECONDS);

  const { statusText } = usePaymentFlow({
    orderId,
    onSuccess: (completedOrderId) => {
      router.replace({
        pathname: '/(payment)/payment-success',
        params: { orderId: completedOrderId, amount }
      });
    },
    onFailure: () => {
      router.replace('/(payment)/payment-failure');
    },
  });

  // Đếm ngược thời gian
  useEffect(() => {
    if (timeLeft === 0) {
      router.replace('/(payment)/payment-failure');
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t > 0 ? t - 1 : 0), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, router]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <View className="flex-1 bg-gray-100" style={{ paddingTop: Constants.statusBarHeight }}>
      {/* Header */}
      <View className="flex-row justify-center items-center p-4 bg-white border-b border-gray-200 relative">
        <Text className="text-lg font-bold text-gray-900">Thanh Toán QR</Text>
        <TouchableOpacity onPress={() => router.back()} className="absolute right-4 top-4">
          <Ionicons name="close" size={24} color="#4B5563" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 px-5 items-center pt-6">
        {/* Đồng hồ đếm ngược */}
        <View className="items-center mb-5">
          <Text className="text-gray-500 text-sm">Đơn hàng hết hạn sau</Text>
          <Text className="text-red-600 text-2xl font-bold">{formatTime(timeLeft)}</Text>
        </View>

        {/* Thẻ QR */}
        <View className="bg-white rounded-2xl p-6 w-full items-center shadow-lg mb-6">
          <View className="mb-4 justify-center items-center">
            {paymentUrl ? (
              <QRCodeDisplay uri={paymentUrl} />
            ) : (
              <View className="h-52 justify-center items-center">
                <ActivityIndicator size="large" color="#16A34A" />
                <Text className="mt-2 text-gray-400">Đang tạo mã QR...</Text>
              </View>
            )}
          </View>

          <View className="items-center mb-4">
            <Text className="text-gray-500 text-sm">Số tiền thanh toán</Text>
            <Text className="text-green-600 text-2xl font-bold">
              {amount ? Number(amount).toLocaleString() : '0'} đ
            </Text>
          </View>

          <View className="w-full items-center">
            <PaymentStatusIndicator text={statusText} />
          </View>
        </View>

        {/* Hướng dẫn */}
        <View className="w-full">
          <Text className="font-bold text-gray-700 mb-2">Hướng dẫn:</Text>
          <Text className="text-gray-600 mb-1">1. Mở App Ngân hàng / Ví điện tử.</Text>
          <Text className="text-gray-600 mb-1">2. Quét mã QR ở trên.</Text>
          <Text className="text-gray-600">3. Hệ thống sẽ tự động xác nhận.</Text>
        </View>
      </View>
    </View>
  );
}
