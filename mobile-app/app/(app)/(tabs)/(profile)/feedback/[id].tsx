import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function FeedbackDetail() {
  const { id } = useLocalSearchParams();

  // ✅ Dữ liệu có thêm user và userId (chỉ dùng nội bộ, không hiển thị)
  const feedback = {
    id,
    userId: "U001",
    userName: "Nguyễn Văn A",
    date: "2025-10-27",
    facility: 4,
    speed: 5,
    battery: 4,
    price: 3,
    staff: 5,
    satisfaction: 5,
    comment: "Dịch vụ tuyệt vời, tốc độ nhanh.",
    adminReply:
      "Cảm ơn bạn đã tin tưởng sử dụng dịch vụ. Chúng tôi sẽ cố gắng hơn nữa!",
  };

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

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold text-center mb-4">
        Chi tiết phản hồi
      </Text>

      {/* Thông tin ngày */}
      <View className="flex-row justify-between mb-2">
        <Text className="text-gray-600">Ngày gửi:</Text>
        <Text className="text-gray-800 font-semibold">{feedback.date}</Text>
      </View>

      {/* Các tiêu chí đánh giá */}
      {[
        ["Cơ sở vật chất", feedback.facility],
        ["Tốc độ đổi pin", feedback.speed],
        ["Tình trạng pin sau đổi", feedback.battery],
        ["Giá cả dịch vụ", feedback.price],
        ["Thái độ nhân viên", feedback.staff],
        ["Mức độ hài lòng", feedback.satisfaction],
      ].map(([label, rating]) => (
        <View
          key={label}
          className="flex-row justify-between items-center mb-3"
        >
          <Text className="text-lg text-gray-700">{label}</Text>
          {renderStars(Number(rating))}
        </View>
      ))}

      {/* Nội dung phản hồi */}
      <Text className="mt-4 text-lg font-semibold">Phản hồi của bạn:</Text>
      <Text className="text-gray-700 mt-2">{feedback.comment}</Text>

      {/* Phản hồi từ admin */}
      {feedback.adminReply && (
        <View className="mt-6 bg-blue-50 border border-blue-200 p-4 rounded-xl">
          <Text className="text-lg font-semibold text-blue-800 mb-1">
            Phản hồi từ quản trị viên:
          </Text>
          <Text className="text-blue-900">{feedback.adminReply}</Text>
        </View>
      )}
    </ScrollView>
  );
}
