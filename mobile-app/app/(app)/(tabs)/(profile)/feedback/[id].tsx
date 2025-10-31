import { FeedbackItem } from "@/api/mockApi";
import CardItem from "@/components/cardItem";
import Header from "@/components/header";
import { MAX_WIDTH, VAR } from "@/constants/varriable";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DetailFeedback() {
  const { detailFeedback } = useLocalSearchParams();
  const router = useRouter();

  let feedbackDetail: FeedbackItem | null = null;
  try {
    feedbackDetail = detailFeedback
      ? JSON.parse(detailFeedback as string)
      : null;
  } catch {}

  return (
    <SafeAreaView className="flex-1 bg-[#f3f6fb]">
      <View className="flex-1">
        <Header
          iconLeft="chevron-left"
          title="Chi tiết phản hồi"
          onPressIconLeft={() => router.back()}
        />

        <View className="flex-1 px-3 justify-start mt-3">
          <Text className="text-gray-500 text-sm mb-2">
            Ngày gửi:{" "}
            <Text className="text-gray-700 font-medium">
              {new Date(feedbackDetail?.createdAt || "").toLocaleString("vi-VN")}
            </Text>
          </Text>

          <CardItem
            title={feedbackDetail?.description ?? "Không có nội dung"}
            style={{
              maxWidth: MAX_WIDTH * 0.8,
              marginLeft: MAX_WIDTH - MAX_WIDTH * 0.8,
              marginBottom: 20,
              backgroundColor: VAR.PRIMARY_COLOR,
            }}
          />

          {(feedbackDetail as any)?.adminReply ? (
            <CardItem
              title={(feedbackDetail as any).adminReply}
              style={{
                maxWidth: MAX_WIDTH * 0.8,
                backgroundColor: "#e6f3ff",
                borderColor: "#b6d8ff",
              }}
            />
          ) : (
            <Text className="text-gray-500 italic text-center mt-4">
              Quản trị viên chưa phản hồi.
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
