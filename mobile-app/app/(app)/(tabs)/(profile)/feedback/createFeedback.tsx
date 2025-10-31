import React, { useState } from "react";
import { View, Text, Alert, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Button from "@/components/button";
import CustomInput from "@/components/custom-input";
import { MaterialIcons } from "@expo/vector-icons";

// ✅ Các tiêu chí đánh giá cố định
const ratingCategories = [
  { key: "facility", label: "Cơ sở vật chất" },
  { key: "speed", label: "Tốc độ đổi pin" },
  { key: "battery", label: "Tình trạng pin sau khi đổi" },
  { key: "price", label: "Giá cả dịch vụ" },
  { key: "staff", label: "Thái độ nhân viên" },
  { key: "satisfaction", label: "Mức độ hài lòng chung" },
] as const;

// ✅ Tạo kiểu tương ứng
type RatingCategory = typeof ratingCategories[number]["key"];

export default function CreateFeedback() {
  const router = useRouter();
  const [feedback, setFeedback] = useState("");
  const [ratings, setRatings] = useState<Record<RatingCategory, number>>({
    facility: 0,
    speed: 0,
    battery: 0,
    price: 0,
    staff: 0,
    satisfaction: 0,
  });

  // ✅ Sự kiện đánh giá
  const onRate = (key: RatingCategory, value: number) => {
    setRatings((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ Gửi đánh giá
  const onPressSendFeedback = () => {
    const allRated = Object.values(ratings).every((v) => v > 0);
    if (!allRated) {
      Alert.alert("⚠️ Vui lòng đánh giá đầy đủ tất cả các mục!");
      return;
    }

    // ✅ Giả lập dữ liệu feedback mới (thêm user, userId)
    const newFeedback = {
      id: Date.now().toString(),
      userId: "U001", // 👈 Tạm cố định, sau này thay bằng user thật
      userName: "Nguyễn Văn A", // 👈 Có thể lấy từ context đăng nhập
      date: new Date().toISOString().split("T")[0],
      ...ratings,
      comment: feedback,
      adminReply: "",
    };

    console.log("📤 Feedback gửi đi:", newFeedback);

    Alert.alert("🎉 Gửi thành công", "Cảm ơn bạn đã đóng góp ý kiến!");
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
        {/* Logo & lời chào */}
        <View className="items-center mb-4 mt-2">
          <Image
            source={require("../../../../../assets/images/fivemonkeys_logo.png")}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <Text className="text-xl font-semibold text-center mt-2 text-emerald-700">
            EV FiveMonkeys xin chào 👋
          </Text>
          <Text className="text-gray-600 text-center mt-1 text-base">
            Mỗi đánh giá của bạn giúp chúng tôi hoàn thiện hơn mỗi ngày.
          </Text>
        </View>

        {/* Các mục đánh giá */}
        <View className="space-y-5 mt-3">
          {ratingCategories.map((item) => (
            <View
              key={item.key}
              className="flex-row items-center justify-between border-b border-gray-100 pb-3"
            >
              <Text className="text-lg font-medium text-gray-800">
                {item.label}
              </Text>

              <View className="flex-row">
                {[1, 2, 3, 4, 5].map((star) => (
                  <MaterialIcons
                    key={star}
                    name={
                      star <= ratings[item.key as RatingCategory]
                        ? "star"
                        : "star-border"
                    }
                    size={34}
                    color={
                      star <= ratings[item.key as RatingCategory]
                        ? "#facc15"
                        : "#d1d5db"
                    }
                    onPress={() => onRate(item.key as RatingCategory, star)}
                    style={{ marginHorizontal: 2 }}
                  />
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Ô nhập phản hồi */}
        <View className="mt-8">
          <CustomInput
            placeholder="Nhập phản hồi hoặc góp ý của bạn..."
            multiline
            className="min-h-28 text-lg"
            value={feedback}
            onChange={(event) => setFeedback(event.nativeEvent.text)}
          />
        </View>

        {/* Nút gửi */}
        <View className="mt-8 mb-10">
          <Button title="Gửi đánh giá" onPress={onPressSendFeedback} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
