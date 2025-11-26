import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  status?: 'PENDING' | 'PAID' | 'FAILED' | string;
  text?: string;
}

export default function PaymentStatusIndicator({ status, text }: Props) {
  // Kiểm tra trạng thái
  const isSuccess = status === 'PAID' || text?.toLowerCase().includes('thành công');
  const isFailed = status === 'FAILED' || text?.toLowerCase().includes('thất bại') || text?.toLowerCase().includes('lỗi');
  const isPending = !isSuccess && !isFailed;

  if (isPending) {
    return (
      <View className="flex-row items-center px-4 py-2 rounded-full mt-2 bg-blue-100">
        <ActivityIndicator size="small" color="#0284C7" />
        <Text className="ml-2 text-blue-700 font-semibold text-sm">
          {text || 'Đang chờ thanh toán...'}
        </Text>
      </View>
    );
  }

  // Nếu PAID hoặc FAILED
  const iconName = isSuccess ? 'checkmark-circle' : 'alert-circle';
  const color = isSuccess ? '#16A34A' : '#DC2626';
  const bgColor = isSuccess ? '#DCFCE7' : '#FEE2E2';

  return (
    <View className="flex-row items-center px-4 py-2 rounded-full mt-2" style={{ backgroundColor: bgColor }}>
      <Ionicons name={iconName} size={20} color={color} />
      <Text className="ml-2 font-semibold text-sm" style={{ color }}>
        {text || status}
      </Text>
    </View>
  );
}