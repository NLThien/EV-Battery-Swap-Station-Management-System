import { VAR } from "@/constants/varriable";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileUserScreen() {
  const router = useRouter();

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-background">
      {/* Header */}
      <View className="h-14 flex-row items-center px-3">
        {/* Back button - kích thước cố định để cân 2 bên */}
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          android_ripple={{
            color: "rgba(255,255,255,0.08)",
            borderless: false,
          }}
          className=" items-center justify-center rounded-xl "
        >
          <MaterialIcons
            name="chevron-left"
            size={40}
            color={VAR?.ICON_COLOR ?? "#fff"}
          />
        </Pressable>

        {/* Tiêu đề căn giữa tuyệt đối theo chiều ngang màn hình */}
        <View
          pointerEvents="none"
          className="absolute left-0 right-0 h-14 items-center justify-center"
        >
          <Text className="text-text text-[20px] text-base font-semibold">
            Thông tin người dùng
          </Text>
        </View>

        {/* Placeholder phải để cân đối với nút back */}
        <View className="w-11 h-11" />
      </View>

      {/* Nội dung màn hình */}
      <View className="flex-1 px-4 py-2">{/* ...content */}</View>
    </SafeAreaView>
  );
}
