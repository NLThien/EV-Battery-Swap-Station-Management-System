import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  RefreshControl, 
  TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import  apiClient  from '../../../lib/apiClient';
import { Ionicons } from '@expo/vector-icons';

interface Transaction {
  id: string;
  orderId: string;
  amount: number;
  status: 'PENDING' | 'PAID' | 'FAILED';
  createdAt: string;
  gatewayTxnRef: string;
}

export default function HistoryScreen() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchHistory = async () => {
    try {
      const { data } = await apiClient.get('/(payment)/transactions');
      setTransactions(data.transactions);
    } catch (error) {
      console.error('Lỗi tải lịch sử:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchHistory();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID': return '#16A34A'; // Xanh lá
      case 'FAILED': return '#DC2626'; // Đỏ
      default: return '#D97706'; // Vàng (Pending)
    }
  };

  const renderItem = ({ item }: { item: Transaction }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => router.push({
        pathname: '/(payment)/transaction',
        params: { data: JSON.stringify(item) }
      })}
    >
      <View style={styles.cardHeader}>
        <View style={styles.iconRow}>
           <View style={[styles.iconBox, { backgroundColor: getStatusColor(item.status) + '20' }]}>
             <Ionicons 
                name={item.status === 'PAID' ? 'checkmark' : 'time'} 
                size={18} 
                color={getStatusColor(item.status)} 
             />
           </View>
           <View>
             <Text style={styles.orderId}>Đơn: {item.orderId.slice(0, 8)}...</Text>
             <Text style={styles.date}>
               {new Date(item.createdAt).toLocaleString('vi-VN')}
             </Text>
           </View>
        </View>
        
        <View style={{alignItems: 'flex-end'}}>
           <Text style={[styles.amount, { color: getStatusColor(item.status) }]}>
             {item.amount.toLocaleString()} đ
           </Text>
           <Text style={[styles.statusBadge, { color: getStatusColor(item.status) }]}>
             {item.status}
           </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lịch Sử Giao Dịch</Text>
      </View>

      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyState}>
              <Ionicons name="receipt-outline" size={64} color="#9CA3AF" />
              <Text style={styles.emptyText}>Chưa có giao dịch nào</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { padding: 20, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827' },
  listContent: { padding: 16 },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  iconRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBox: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  orderId: { fontSize: 14, fontWeight: '600', color: '#374151' },
  date: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  amount: { fontSize: 16, fontWeight: 'bold' },
  statusBadge: { fontSize: 11, fontWeight: '600', marginTop: 2 },
  emptyState: { alignItems: 'center', marginTop: 100 },
  emptyText: { color: '#6B7280', marginTop: 10 },
});