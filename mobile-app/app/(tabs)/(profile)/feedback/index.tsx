import Header from "@/components/header";
import ItemList from "@/components/item-list";
import { useRouter, useSegments } from "expo-router";
import { FlatList, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
const data = [
  { id: 1, description: "Yêu cầu đổi pin", createdAt: "2025-01-01T08:30:00Z" },
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
];

function Feedback() {
  const segments = useSegments();
  console.log(segments);
  const router = useRouter();

  const onBack = () => {
    router.back();
  };
  const onPressAdd = () => {
    console.log("addd feedback");
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
        <View className="px-3 mt-2">
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
            renderItem={({ item }) => (
              <ItemList
                createAt={item.createdAt}
                description={item.description}
                id={item.id}
              />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Feedback;
