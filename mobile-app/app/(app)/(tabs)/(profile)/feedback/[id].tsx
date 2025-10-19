import { FeedbackItem } from "@/api/mockApi";
import CardItem from "@/components/cardItem";
import Header from "@/components/header";
import { MAX_WIDTH, VAR } from "@/constants/varriable";

import { useLocalSearchParams, useRouter, useSegments } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function DetailFeedback() {
  const segments = useSegments();
  const params = useLocalSearchParams();
  const router = useRouter();

  // 1) Lấy params dạng string
  const raw = Array.isArray(params.detailFeedback)
    ? params.detailFeedback[0]
    : params.detailFeedback;

  // 2) Parse an toàn
  let feedbackDetail: FeedbackItem | null = null;

  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);

      // 3) Kiểm tra structure tạm (validate nhẹ)
      if (
        typeof parsed.id === "number" &&
        typeof parsed.description === "string" &&
        typeof parsed.createdAt === "string"
      ) {
        feedbackDetail = parsed as FeedbackItem;
      } else {
        console.warn("Sai cấu trúc FeedbackItem");
      }
    } catch (error) {
      console.warn("JSON không hợp lệ", error);
    }
  }

  console.log(feedbackDetail);
  console.log(segments);

  const onPressBack = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 ">
        <Header
          iconLeft="chevron-left"
          title="Nội dung"
          onPressIconLeft={onPressBack}
        />
        <View className="  flex-1  px-3 justify-start ">
          {/* nội dung mình gửi */}
          <CardItem
            title={feedbackDetail?.description ?? "Lỗi"}
            style={{
              maxWidth: MAX_WIDTH * 0.75,
              marginLeft: MAX_WIDTH - MAX_WIDTH * 0.75,
              marginBottom: 20,
              marginTop: 20,
              backgroundColor: VAR.PRIMARY_COLOR,
            }}
          />
          {/* chỗ người ta trả lời */}
          <CardItem
            title=" đây là phần trả lời của admin đây là phần trả lời của admin đây là phần trả lời của admin đây là phần trả lời của admin đây là phần trả lời của admin đây là phần trả lời của admin 123"
            style={{ maxWidth: MAX_WIDTH * 0.75 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default DetailFeedback;
