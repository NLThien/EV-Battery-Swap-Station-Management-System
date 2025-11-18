import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList, 
    ActivityIndicator 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
// import { apiClient } from '../../AuthContext'; 
import { Stack } from 'expo-router';

interface Transaction {
  id: string; // ID của PaymentLog
  orderId: string;
  amount: number;
  status: 'PENDING' | 'PAID' | 'FAILED';
  createdAt: string; // Dạng chuỗi Date (ISO String)
}


const TransactionItem = ({ item }: { item: Transaction }) => {
  

  const getStatusStyle = (status: Transaction['status']) => {
    switch (status) {
      case 'PAID': return styles.statusPaid;
      case 'PENDING': return styles.statusPending;
      case 'FAILED': return styles.statusFailed;
      default: return {};
    }
  };

  return (
    <View style={styles.itemContainer}>
      {}
      <View>
        <Text style={styles.itemOrderId}>Đơn hàng: {item.orderId}</Text>
        <Text style={styles.itemDate}>
          {new Date(item.createdAt).toLocaleString('vi-VN')}
        </Text>
      </View>
      
      {}
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={styles.itemAmount}>{item.amount.toLocaleString()} VNĐ</Text>
        <Text style={[styles.itemStatus, getStatusStyle(item.status)]}>{item.status}</Text>
      </View>
    </View>
  );
};

export default function TransactionHistoryScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        
        const response = await apiClient.get('/payment/transactions');
        
        setTransactions(response.data.transactions); 
      } catch (err) {
        console.error("Lỗi khi tải lịch sử:", err);
        setError('Không thể tải lịch sử giao dịch. Vui lòng thử lại.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Đang tải lịch sử...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Đặt tiêu đề cho màn hình */}
      <Stack.Screen 
        options={{ 
          title: 'Lịch sử Giao dịch',
          headerShown: true 
        }} 
      />
      
      <FlatList
        data={transactions}
        renderItem={({ item }) => <TransactionItem item={item} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text>Chưa có giao dịch nào.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5' 
  },
  centered: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingTop: 50 
  },
  errorText: { 
    color: 'red', 
    fontSize: 16 
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2, // Shadow cho Android
    shadowColor: '#000', // Shadow cho iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemOrderId: { 
    fontSize: 16, 
    fontWeight: 'bold',
    color: '#333'
  },
  itemDate: { 
    fontSize: 12, 
    color: 'gray', 
    marginTop: 4 
  },
  itemAmount: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#16A34A' // Màu xanh lá
  },
  itemStatus: { 
    fontSize: 12, 
    fontWeight: 'bold', 
    marginTop: 4, 
    paddingHorizontal: 8, 
    paddingVertical: 3, 
    borderRadius: 10, 
    overflow: 'hidden' // Đảm bảo bo góc cho background
  },
  statusPaid: { 
    backgroundColor: '#D1FAE5', // Xanh lá nhạt
    color: '#065F46' // Xanh lá đậm
  },
  statusPending: { 
    backgroundColor: '#FEF3C7', // Vàng nhạt
    color: '#92400E' // Vàng đậm
  },
  statusFailed: { 
    backgroundColor: '#FEE2E2', // Đỏ nhạt
    color: '#991B1B' // Đỏ đậm
  },
});