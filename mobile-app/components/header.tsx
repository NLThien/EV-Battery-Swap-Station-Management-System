import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  title: string;
  iconLeft: keyof typeof MaterialIcons.glyphMap;
  onPressIconLeft: () => void;
  iconRight?: keyof typeof MaterialIcons.glyphMap;
  onPressIconRight?: () => void;
}

function Header({
  title,
  iconLeft,
  iconRight,
  onPressIconLeft,
  onPressIconRight,
}: HeaderProps) {
  return (
    <View className="h-14 flex-row justify-between items-center px-3">
      {/* Back button - kích thước cố định để cân 2 bên */}
      <Pressable
        onPress={onPressIconLeft}
        hitSlop={12}
        android_ripple={{
          color: "rgba(255,255,255,0.08)",
          borderless: false,
        }}
        className=" items-center justify-center shadow-sm bg-[#A8D4FF] rounded-full "
      >
        <MaterialIcons name={iconLeft} size={40} color={"#fff"} />
      </Pressable>

      {/* Tiêu đề căn giữa tuyệt đối theo chiều ngang màn hình */}
      <View pointerEvents="none" className=" h-14 items-center justify-center">
        <Text className="text-text text-2xl font-semibold">{title}</Text>
      </View>

      {/* Placeholder phải để cân đối với nút back */}
      <TouchableOpacity className=" rounded-full" onPress={onPressIconRight}>
        <View className="h-11 w-11 justify-center items-center ">
          <MaterialIcons name={iconRight} size={35} color={"#fff"} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default Header;
