import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  RefreshControl,
  Alert 
} from 'react-native';
import { useRouter } from 'expo-router';
import { useBookings } from '@/hooks/booking-service/useBookings';

export default function BookingsScreen() {
  const router = useRouter();
  const {
    bookings,
    loading,
    refreshing,
    error,
    onRefresh,
    cancelBooking
  } = useBookings();

  // Hàm xử lý hủy booking
  const handleCancelBooking = async (bookingId, customerPhone) => {
    Alert.alert(
      'Xác nhận hủy',
      'Bạn có chắc chắn muốn hủy đặt lịch này?',
      [
        { text: 'Không', style: 'cancel' },
        { 
          text: 'Có', 
          onPress: async () => {
            const success = await cancelBooking(bookingId);
            if (success) {
              Alert.alert('Thành công', 'Đã hủy đặt lịch');
            }
          }
        }
      ]
    );
  };

  // Render mỗi booking item
  const renderBookingItem = ({ item }) => (
    <TouchableOpacity 
      className="bg-white p-4 mb-3 rounded-lg border border-gray-200"
      onPress={() => {
        // Có thể navigation đến chi tiết booking
        console.log('Booking details:', item);
      }}
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="text-lg font-semibold">Booking #{item.id}</Text>
          <Text className="text-gray-600 mt-1">Trạm: {item.stationId}</Text>
          <Text className="text-gray-600">SĐT: {item.customerPhone}</Text>
          <Text className="text-gray-600">
            Thời gian: {new Date(item.scheduledTime).toLocaleString('vi-VN')}
          </Text>
        </View>
        
        <View className="items-end">
          <Text 
            className={`font-medium ${
              item.status === 'COMPLETED' ? 'text-green-600' :
              item.status === 'PENDING' ? 'text-orange-600' :
              item.status === 'CANCELLED' ? 'text-red-600' : 'text-blue-600'
            }`}
          >
            {item.status === 'COMPLETED' ? 'Hoàn thành' :
             item.status === 'PENDING' ? 'Đang chờ' :
             item.status === 'CANCELLED' ? 'Đã hủy' : item.status}
          </Text>
          
          {/* Nút hủy cho booking đang chờ */}
          {item.status === 'PENDING' && (
            <TouchableOpacity 
              className="bg-red-500 px-3 py-1 rounded mt-2"
              onPress={() => handleCancelBooking(item.id, item.customerPhone)}
            >
              <Text className="text-white text-xs">Hủy</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  // Loading state
  if (loading) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center">
        <Text className="text-gray-500">Đang tải lịch sử đặt lịch...</Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center p-4">
        <Text className="text-red-500 text-center mb-4">{error}</Text>
        <TouchableOpacity 
          className="bg-blue-500 rounded-lg px-6 py-3"
          onPress={onRefresh}
        >
          <Text className="text-white font-semibold">Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-4">
        <Text className="text-2xl font-bold mb-4">Lịch sử đặt lịch</Text>
        
        <FlatList
          data={bookings}
          renderItem={renderBookingItem}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View className="items-center mt-8">
              <Text className="text-gray-500 text-center mb-4">
                Chưa có lịch đặt nào
              </Text>
              <TouchableOpacity
                className="bg-blue-500 rounded-lg px-6 py-3"
                onPress={() => router.push("/(bookingSwap)/booking")}
              >
                <Text className="text-white font-semibold">
                  Đặt lịch ngay
                </Text>
              </TouchableOpacity>
            </View>
          }
        />

        {/* Nút đặt lịch mới - chỉ hiện khi có dữ liệu */}
        {bookings.length > 0 && (
          <TouchableOpacity
            className="bg-green-500 rounded-lg p-4 mt-4"
            onPress={() => router.push("/(bookingSwap)/booking")}
          >
            <Text className="text-white text-center font-semibold">
              Đặt lịch mới
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}