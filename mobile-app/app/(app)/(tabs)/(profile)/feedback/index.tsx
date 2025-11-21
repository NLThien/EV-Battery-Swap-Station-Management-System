import { fetchFeedbacks } from "@/api/feedbackApi"; // 👈 Import API
import { FeedbackItem } from "@/api/mockApi";
import { VAR } from "@/constants/varriable";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react"; // Thêm useCallback
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Feedback() {
  const router = useRouter();
  const [dataFeedback, setDataFeedback] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Hàm fetch dữ liệu từ BE
  const loadFeedbacks = async () => {
    setLoading(true);
    const data = await fetchFeedbacks();
    setDataFeedback(data);
    setLoading(false);
  };

  // ✅ Tải dữ liệu khi component được focus (ví dụ: sau khi tạo mới và quay lại)
  useFocusEffect(
    useCallback(() => {
      loadFeedbacks();
      return () => {
        // Cleanup function
      };
    }, [])
  );

  const onPressAdd = () => router.push("../feedback/createFeedback");

  const onPressItem = (detailFeedback: FeedbackItem) => {
    router.push({
      pathname: "../feedback/[id]",
      params: { id: detailFeedback.id }, // 👈 Chỉ truyền ID
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 px-3 mt-2 pb-24">
        {loading ? (
          <ActivityIndicator size="large" color={VAR.PRIMARY_COLOR} />
        ) : (
          <FlatList
            data={dataFeedback}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            renderItem={({ item }) => (
              <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <Text className="text-base font-semibold text-gray-800 mb-1">
                  {item.description}
                </Text>

                <Text className="text-xs text-gray-400 mb-2">
                  {new Date(item.createdAt).toLocaleString("vi-VN")}
                </Text>

                {item.adminReply && item.adminReply.trim() !== "" ? (
                  <Text className="text-green-700 bg-green-100 px-2 py-1 rounded-lg self-start text-xs">
                    ✅ Đã phản hồi
                  </Text>
                ) : (
                  <Text className="text-gray-500 bg-gray-100 px-2 py-1 rounded-lg self-start text-xs">
                    ⏳ Chờ phản hồi
                  </Text>
                )}

                <Text
                  onPress={() => onPressItem(item)}
                  className="text-emerald-600 text-sm mt-2 underline"
                >
                  Xem chi tiết
                </Text>
              </View>
            )}
          />
        )}
      </View>

      {/* Nút tạo phản hồi mới */}
      <View className="absolute bottom-4 left-4 right-4">
        <TouchableOpacity
          onPress={onPressAdd}
          activeOpacity={0.8}
          className="bg-emerald-600 py-4 rounded-full shadow-lg items-center justify-center"
        >
          <Text className="text-white font-semibold text-base">＋ Tạo yêu cầu mới</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
export default Feedback;