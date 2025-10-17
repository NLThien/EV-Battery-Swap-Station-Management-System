import { FeedbackItem } from "@/api/mockApi";
import Header from "@/components/header";
import ItemList from "@/components/item-list";
import { VAR } from "@/constants/varriable";
import { useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
const data: FeedbackItem[] = [
  {
    id: 1,
    description:
      "Yêu cầu đổi pin và bị gì đấy rất nhiều tôi không thể giải thích thét được",
    createdAt: "2025-01-01T08:30:00Z",
  },
  {
    id: 2,
    description: "Thanh toán thành công",
    createdAt: "2025-01-02T14:15:00Z",
  },
  { id: 3, description: "Báo lỗi trạm", createdAt: "2025-01-03T09:45:00Z" },
  { id: 4, description: "Cập nhật hồ sơ", createdAt: "2025-01-04T16:20:00Z" },
  { id: 5, description: "Thêm phương tiện", createdAt: "2025-01-05T11:10:00Z" },
  { id: 6, description: "Yêu cầu hỗ trợ", createdAt: "2025-01-06T19:05:00Z" },
  { id: 7, description: "Đổi mật khẩu", createdAt: "2025-01-07T07:55:00Z" },
  { id: 8, description: "Đặt lịch đổi pin", createdAt: "2025-01-08T12:40:00Z" },
  { id: 9, description: "Hủy lịch đổi pin", createdAt: "2025-01-09T21:30:00Z" },
  {
    id: 10,
    description: "Nhận thông báo hệ thống",
    createdAt: "2025-01-10T10:00:00Z",
  },
  { id: 11, description: "Yêu cầu đổi pin", createdAt: "2025-01-01T08:30:00Z" },
  {
    id: 12,
    description: "Thanh toán thành công",
    createdAt: "2025-01-02T14:15:00Z",
  },
  { id: 13, description: "Báo lỗi trạm", createdAt: "2025-01-03T09:45:00Z" },
  { id: 14, description: "Cập nhật hồ sơ", createdAt: "2025-01-04T16:20:00Z" },
  {
    id: 15,
    description: "Thêm phương tiện",
    createdAt: "2025-01-05T11:10:00Z",
  },
  { id: 16, description: "Yêu cầu hỗ trợ", createdAt: "2025-01-06T19:05:00Z" },
  { id: 17, description: "Đổi mật khẩu", createdAt: "2025-01-07T07:55:00Z" },
  {
    id: 18,
    description: "Đặt lịch đổi pin",
    createdAt: "2025-01-08T12:40:00Z",
  },
  {
    id: 19,
    description: "Hủy lịch đổi pin",
    createdAt: "2025-01-09T21:30:00Z",
  },
  {
    id: 20,
    description: "Nhận thông báo hệ thống",
    createdAt: "2025-01-10T10:00:00Z",
  },
];

function Feedback() {
  const segments = useSegments();
  console.log(segments);
  const router = useRouter();
  const [dataFeedback, setDataFeedback] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);

  const onBack = () => {
    router.back();
  };
  const onPressAdd = () => {
    router.push("../feedback/createFeedback");
  };

  useEffect(() => {
    setTimeout(() => {
      setDataFeedback(data);
      setLoading(false);
    }, 2000);
  }, []);

  const onPressItem = (detailFeedback: object) => {
    router.push({
      pathname: "../feedback/[id]",
      params: {
        detailFeedback: JSON.stringify(detailFeedback),
      },
    });
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        {/* header */}
        <Header
          iconLeft="chevron-left"
          iconRight="add"
          title="Gửi phản hồi hỗ trợ"
          onPressIconLeft={onBack}
          onPressIconRight={onPressAdd}
        />
        {/* content */}
        <View className="px-3 mt-2 pb-24">
          {loading ? (
            <ActivityIndicator size="large" color={VAR.PRIMARY_COLOR} />
          ) : (
            <FlatList
              data={data}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
              renderItem={({ item }) => (
                <ItemList item={item} onPress={() => onPressItem(item)} />
              )}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Feedback;
