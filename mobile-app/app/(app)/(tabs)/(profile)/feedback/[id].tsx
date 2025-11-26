// [id].tsx

import { fetchFeedbackDetail } from "@/api/feedbackApi"; // 👈 Import hàm API
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native"; // Thêm ActivityIndicator

// ✅ Hàm giả lập render Stars (giữ nguyên)
const renderStars = (rating: number) => (
  <View className="flex-row">
    {Array.from({ length: 5 }).map((_, i) => (
      <Ionicons
        key={i}
        name={i < rating ? "star" : "star-outline"}
        size={24}
        color={i < rating ? "#FFD700" : "#ccc"}
      />
    ))}
  </View>
);

// ✅ Danh sách các tiêu chí đánh giá (lấy từ createFeedback.tsx để nhất quán)
const ratingCategories = [
  { key: "facility", label: "Cơ sở vật chất" },
  { key: "speed", label: "Tốc độ đổi pin" },
  { key: "battery", label: "Tình trạng pin sau đổi" },
  { key: "price", label: "Giá cả dịch vụ" },
  { key: "staff", label: "Thái độ nhân viên" },
  { key: "satisfaction", label: "Mức độ hài lòng" },
];

export default function FeedbackDetail() {
  // Lấy ID từ tham số đường dẫn (đảm bảo index.tsx đã được cập nhật để chỉ truyền ID)
  const { id } = useLocalSearchParams(); 

  // State để lưu chi tiết phản hồi và trạng thái tải
  const [feedback, setFeedback] = useState<any>(null); 
  const [loading, setLoading] = useState(true);

  // ✅ Logic gọi API để lấy chi tiết
  useEffect(() => {
    if (id) {
      const loadDetail = async () => {
        setLoading(true);
        const detail = await fetchFeedbackDetail(id as string); // Gọi API
        setFeedback(detail);
        setLoading(false);
      };
      loadDetail();
    } else {
      setLoading(false);
    }
  }, [id]); // Chạy lại khi ID thay đổi

  // Hiển thị trạng thái tải
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#059669" />
        <Text className="mt-2 text-gray-500">Đang tải chi tiết phản hồi...</Text>
      </View>
    );
  }

  // Hiển thị khi không tìm thấy
  if (!feedback) {
    return (
      <View className="flex-1 justify-center items-center bg-white p-4">
        <Text className="text-xl font-bold text-red-500">
          ❌ Không tìm thấy chi tiết phản hồi (ID: {id})
        </Text>
      </View>
    );
  }
  
  // Dữ liệu đã tải thành công, bây giờ render
  
  // ⚡ Lấy ngày gửi: Dùng date (BE) hoặc format từ createdAt (FE)
  const displayDate = feedback.date 
    ? feedback.date 
    : new Date(feedback.createdAt).toLocaleDateString("vi-VN");

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold text-center mb-4 text-emerald-700">
        Chi tiết phản hồi
      </Text>
      
      <Text className="text-lg font-semibold text-gray-800 mb-3 text-center">
          Từ: {feedback.userName} (ID: {feedback.userId})
      </Text>

      {/* Thông tin ngày */}
      <View className="flex-row justify-between mb-2 border-b border-gray-100 pb-2">
        <Text className="text-gray-600 font-medium">Ngày gửi:</Text>
        <Text className="text-gray-800 font-semibold">{displayDate}</Text>
      </View>

      {/* Các tiêu chí đánh giá */}
      {ratingCategories.map((item) => (
        // Sử dụng feedback[item.key] để lấy rating động từ dữ liệu API
        <View
          key={item.key}
          className="flex-row justify-between items-center mb-3"
        >
          <Text className="text-lg text-gray-700">{item.label}</Text>
          {renderStars(Number(feedback[item.key]))}
        </View>
      ))}

      {/* Nội dung phản hồi */}
      <Text className="mt-4 text-lg font-semibold border-t pt-4">Phản hồi của bạn:</Text>
      <Text className="text-gray-700 mt-2 text-base bg-gray-50 p-3 rounded-lg">
        {feedback.comment}
      </Text>

      {/* Phản hồi từ admin */}
      {feedback.adminReply && feedback.adminReply.trim() !== "" && (
        <View className="mt-6 bg-blue-50 border border-blue-200 p-4 rounded-xl">
          <Text className="text-lg font-semibold text-blue-800 mb-1">
            Phản hồi từ quản trị viên:
          </Text>
          <Text className="text-blue-900 text-base">{feedback.adminReply}</Text>
        </View>
      )}
      
      <View className="h-10" /> 
    </ScrollView>
  );
}