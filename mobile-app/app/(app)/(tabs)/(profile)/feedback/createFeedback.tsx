import Button from "@/components/button";
import CustomInput from "@/components/custom-input";
import Header from "@/components/header";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function CreateFeedback() {
  const router = useRouter();
  const [feedback, setFeedback] = useState("");

  const onPressBack = () => {
    router.back();
  };

  const onPressSendFeedback = () => {
    if (!feedback.trim()) {
      Alert.alert("Thông báo", "Vui lòng nhập nội dung phản hồi.");
      return;
    }

    // ⚙️ Gửi phản hồi giả lập
    const newFeedback = {
      id: Date.now(),
      description: feedback,
      createdAt: new Date().toISOString(),
    };

    // ⚡ Lưu tạm vào localStorage (hoặc AsyncStorage để web và app đồng bộ)
    // Giả lập API Gateway: push vào local list
    const existing = globalThis.feedbackList || [];
    globalThis.feedbackList = [newFeedback, ...existing];

    // ✅ Quay lại trang danh sách
    router.back();
  };

  const onPressCall = () => {
    console.log("call...");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <Header
          title="Gửi hỗ trợ"
          iconLeft="chevron-left"
          iconRight="phone-enabled"
          onPressIconLeft={onPressBack}
          onPressIconRight={onPressCall}
        />

        {/* 🌿 Logo & Lời chào */}
<View className="px-5 mt-4 items-center">
  <Image
    source={require("../../../../../assets/images/fivemonkeys_logo.png")} // ⬅️ chỉnh đúng đường dẫn ảnh của bạn
    className="w-32 h-32 mb-3 rounded-full border border-emerald-500"
    resizeMode="cover"
  />
  <Text className="text-center text-xl font-semibold text-emerald-600">
    EV FiveMonkeys xin chào!
  </Text>
  <Text className="text-center text-gray-600 mt-1 text-base">
    Rất mong nhận được phản hồi để chúng tôi phục vụ bạn tốt hơn 💚
  </Text>
</View>


        {/* ✍️ Nội dung nhập phản hồi */}
        <View className="px-5 mt-6">
          <CustomInput
            className="min-h-24 text-lg border-gray-300"
            placeholder="Nhập yêu cầu hoặc phản hồi của bạn..."
            multiline={true}
            value={feedback}
            onChange={(event) => setFeedback(event.nativeEvent.text)}
          />

          <View className="mt-6">
            <Button title="Gửi phản hồi" onPress={onPressSendFeedback} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default CreateFeedback;
