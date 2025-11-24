import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function TransactionDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ data: string }>();
  
  // Parse dữ liệu JSON truyền từ màn hình trước
  const transaction = params.data ? JSON.parse(params.data) : null;

  if (!transaction) {
    return (
        <SafeAreaView style={styles.container}><Text>Không tìm thấy dữ liệu</Text></SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết Giao dịch</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Số tiền lớn */}
        <View style={styles.amountCard}>
          <Text style={styles.label}>Số tiền thanh toán</Text>
          <Text style={styles.amount}>
            {transaction.amount.toLocaleString()} VNĐ
          </Text>
          <View style={[
            styles.statusBadge, 
            transaction.status === 'PAID' ? styles.statusSuccess : styles.statusPending
          ]}>
            <Text style={styles.statusText}>{transaction.status}</Text>
          </View>
        </View>

        {/* Chi tiết */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin chi tiết</Text>
          
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Mã giao dịch</Text>
            <Text style={styles.rowValue}>{transaction.gatewayTxnRef}</Text>
          </View>
          
          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Mã đơn hàng</Text>
            <Text style={styles.rowValue}>{transaction.orderId}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Thời gian</Text>
            <Text style={styles.rowValue}>
              {new Date(transaction.createdAt).toLocaleString('vi-VN')}
            </Text>
          </View>
           
          <View style={styles.divider} />

           <View style={styles.row}>
            <Text style={styles.rowLabel}>Ngân hàng</Text>
            <Text style={styles.rowValue}>TPBank</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: 16, 
    backgroundColor: 'white' 
  },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#111827' },
  content: { padding: 16 },
  amountCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  label: { fontSize: 14, color: '#6B7280', marginBottom: 8 },
  amount: { fontSize: 32, fontWeight: 'bold', color: '#111827', marginBottom: 16 },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  statusSuccess: { backgroundColor: '#DCFCE7' },
  statusPending: { backgroundColor: '#FEF3C7' },
  statusText: { fontWeight: '600', color: '#065F46', fontSize: 14 },
  
  section: { backgroundColor: 'white', borderRadius: 16, padding: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 16, color: '#374151' },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  rowLabel: { color: '#6B7280', fontSize: 14 },
  rowValue: { color: '#111827', fontSize: 14, fontWeight: '500', maxWidth: '60%', textAlign: 'right' },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 8 },
});