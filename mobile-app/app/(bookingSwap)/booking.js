import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Alert 
} from 'react-native';
import { useRouter } from 'expo-router';

export default function BookingScreen() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    customerPhone: '',
    stationId: '',
    batteryType: '',
    scheduledTime: ''
  });
  
  const [loading, setLoading] = useState(false);

  // Hàm xử lý đặt lịch
  const handleBooking = async () => {
    if (!formData.customerPhone || !formData.stationId) {
      Alert.alert('Lỗi', 'Vui lòng nhập số điện thoại và chọn trạm');
      return;
    }

    setLoading(true);
    
    try {
      const bookingData = {
        customerPhone: formData.customerPhone,
        stationId: formData.stationId,
        batteryType: formData.batteryType || 'STANDARD',
        scheduledTime: formData.scheduledTime || new Date().toISOString(),
        status: 'PENDING'
      };

      const response = await fetch('http://your-api-gateway:port/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      });

      if (response.ok) {
        const result = await response.json();
        Alert.alert('Thành công', 'Đặt lịch thành công!');
        router.back(); // Quay lại màn hình trước
      } else {
        throw new Error('Lỗi khi đặt lịch');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể đặt lịch. Vui lòng thử lại.');
      console.error('Booking error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Text className="text-2xl font-bold mb-6">Đặt lịch đổi pin</Text>
        
        {/* Form đặt lịch */}
        <View className="bg-white rounded-lg p-4 shadow-sm">
          {/* Số điện thoại */}
          <View className="mb-4">
            <Text className="text-sm font-medium mb-2">Số điện thoại *</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              placeholder="Nhập số điện thoại"
              value={formData.customerPhone}
              onChangeText={(text) => setFormData({...formData, customerPhone: text})}
              keyboardType="phone-pad"
            />
          </View>

          {/* Chọn trạm */}
          <View className="mb-4">
            <Text className="text-sm font-medium mb-2">Chọn trạm *</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              placeholder="Nhập ID trạm"
              value={formData.stationId}
              onChangeText={(text) => setFormData({...formData, stationId: text})}
            />
          </View>

          {/* Loại pin */}
          <View className="mb-4">
            <Text className="text-sm font-medium mb-2">Loại pin</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              placeholder="Loại pin (mặc định: STANDARD)"
              value={formData.batteryType}
              onChangeText={(text) => setFormData({...formData, batteryType: text})}
            />
          </View>

          {/* Thời gian */}
          <View className="mb-6">
            <Text className="text-sm font-medium mb-2">Thời gian hẹn</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              placeholder="YYYY-MM-DDTHH:MM:SS"
              value={formData.scheduledTime}
              onChangeText={(text) => setFormData({...formData, scheduledTime: text})}
            />
            <Text className="text-xs text-gray-500 mt-1">
              Để trống để đặt ngay bây giờ
            </Text>
          </View>

          {/* Nút đặt lịch */}
          <TouchableOpacity
            className={`bg-blue-500 rounded-lg p-4 ${loading ? 'opacity-50' : ''}`}
            onPress={handleBooking}
            disabled={loading}
          >
            <Text className="text-white text-center font-semibold">
              {loading ? 'Đang xử lý...' : 'Đặt lịch ngay'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}