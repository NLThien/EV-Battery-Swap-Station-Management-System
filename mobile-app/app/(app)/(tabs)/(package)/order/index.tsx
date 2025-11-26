import React, { useState } from "react";
import { ScrollView, Text, View, Alert, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Constants from "expo-constants";
import axios from "axios";

import Button from "@/components/button"; 

// Giả định địa chỉ API Gateway cho việc tạo đơn hàng
const API_GATEWAY_ORDER = "http://192.168.1.15:8087/orders/create"; 

export default function OrderScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const params = useLocalSearchParams<{ 
    packageId: string; 
    packageName: string; 
    price: string 
  }>();

  const price = Number(params.price);
  const packageId = Number(params.packageId);
  const packageName = params.packageName;

  const MOCK_DRIVER_ID = 123; 

  const handleCreateOrder = async () => {
    if (!packageId || !price) {
      Alert.alert("Lỗi", "Thông tin gói thuê không hợp lệ.");
      return;
    }

    setIsLoading(true);
    try {
      const orderPayload = {
        driverId: MOCK_DRIVER_ID, 
        packageId: packageId,
        amount: price,
      };

      const orderRes = await axios.post(API_GATEWAY_ORDER, orderPayload);
      
      const { orderId, paymentUrl } = orderRes.data; 


      router.replace({
        pathname: "../../payment/payment", 
        params: {
          orderId: orderId,
          amount: price.toString(),
          paymentUrl: paymentUrl, 
        },
      });

    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng hoặc lấy QR code:", error);
      Alert.alert("Thất bại", "Không thể tạo đơn hàng. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View 
      className="flex-1 bg-gray-100" 
      // Sử dụng inline style để tránh bị che bởi thanh trạng thái
      style={{ paddingTop: Constants.statusBarHeight }}
    >
      <ScrollView contentContainerStyle={{ padding: 20, gap: 15 }}>
        
        <Text className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Xác Nhận Đơn Hàng
        </Text>

        {/* Thông tin gói thuê */}
        <View className="bg-white rounded-xl p-5 shadow-md shadow-gray-300">
          <Text className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2">
            Thông tin Gói thuê
          </Text>
          
          <View className="flex-row justify-between py-1">
            <Text className="text-base text-gray-600">ID Gói:</Text>
            <Text className="text-base font-semibold text-gray-900">{packageId}</Text>
          </View>
          
          <View className="flex-row justify-between py-1">
            <Text className="text-base text-gray-600">Tên Gói:</Text>
            <Text className="text-base font-semibold text-gray-900">{packageName}</Text>
          </View>
        </View>

        {/* Thông tin Thanh toán */}
        <View className="bg-white rounded-xl p-5 shadow-md shadow-gray-300">
          <Text className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2">
            Chi tiết Thanh toán
          </Text>
          
          <View className="flex-row justify-between py-1 items-baseline">
            <Text className="text-xl text-gray-600 font-medium">Tổng Tiền:</Text>
            <Text className="text-2xl font-extrabold text-green-600">
              {price.toLocaleString()} VNĐ
            </Text>
          </View>
          
          <Text className="text-xs text-gray-500 mt-3 italic text-right">
            *Bao gồm VAT và chi phí dịch vụ.
          </Text>
        </View>

        <Button 
          title={isLoading ? "Đang tạo đơn hàng..." : "Xác nhận và Thanh toán"} 
          onPress={handleCreateOrder} 
          disabled={isLoading}
        >
          {isLoading && <ActivityIndicator color="#fff" className="ml-2" />}
        </Button>
        
        <Button 
          title="Quay lại" 
          onPress={() => router.back()} 
          type="secondary"
        />

      </ScrollView>
    </View>
  );
}