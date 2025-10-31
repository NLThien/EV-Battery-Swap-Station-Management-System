import { FeedbackItem } from "@/api/mockApi";
import Header from "@/components/header";
import ItemList from "@/components/item-list";
import { VAR } from "@/constants/varriable";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const defaultData: FeedbackItem[] = [
  { id: 1, description: "Báo lỗi trạm", createdAt: "2025-01-01T08:30:00Z" },
  { id: 2, description: "Thanh toán thành công", createdAt: "2025-01-02T14:15:00Z" },
];

function Feedback() {
  const router = useRouter();
  const [dataFeedback, setDataFeedback] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);

  const onPressAdd = () => {
    router.push("../feedback/createFeedback");
  };

  const onPressItem = (detailFeedback: object) => {
    router.push({
      pathname: "../feedback/[id]",
      params: {
        detailFeedback: JSON.stringify(detailFeedback),
      },
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const mergedData = [
        ...(globalThis.feedbackList || []),
        ...defaultData,
      ];
      setDataFeedback(mergedData);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        <Header
          iconLeft="chevron-left"
          iconRight="add"
          title="Gửi phản hồi hỗ trợ"
          onPressIconLeft={() => router.back()}
          onPressIconRight={onPressAdd}
        />

        <View className="px-3 mt-2 pb-24">
          {loading ? (
            <ActivityIndicator size="large" color={VAR.PRIMARY_COLOR} />
          ) : (
            <FlatList
              data={dataFeedback}
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
