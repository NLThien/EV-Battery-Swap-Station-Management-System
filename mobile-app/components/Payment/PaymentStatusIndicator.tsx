import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  status?: 'PENDING' | 'PAID' | 'FAILED' | string;
  text?: string;
}

export default function PaymentStatusIndicator({ status, text }: Props) {
  let iconName: keyof typeof Ionicons.glyphMap = 'time';
  let color = '#6B7280'; // Gray
  let bgColor = '#F3F4F6';

  // Logic hiển thị theo trạng thái hoặc text
  if (status === 'PAID' || text?.includes('thành công')) {
    iconName = 'checkmark-circle';
    color = '#16A34A'; // Green
    bgColor = '#DCFCE7';
  } else if (status === 'FAILED' || text?.includes('thất bại') || text?.includes('Lỗi')) {
    iconName = 'alert-circle';
    color = '#DC2626'; // Red
    bgColor = '#FEE2E2';
  } else {
    // PENDING hoặc đang chờ
    return (
      <View style={[styles.container, { backgroundColor: '#E0F2FE' }]}>
        <ActivityIndicator size="small" color="#0284C7" />
        <Text style={[styles.text, { color: '#0284C7' }]}>
          {text || 'Đang chờ thanh toán...'}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Ionicons name={iconName} size={20} color={color} />
      <Text style={[styles.text, { color: color }]}>
        {text || status}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 10,
    gap: 8,
  },
  text: {
    fontWeight: '600',
    fontSize: 14,
  },
});