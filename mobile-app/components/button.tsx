import { VAR } from "@/constants/varriable";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Text, TouchableOpacity, View } from "react-native";

interface ButtonProps {
  title?: string;
  iconName?: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void | Promise<void>;
  disabled?: boolean;
  style?: object;
  colorIcon?: string;
  type?: "primary" | "secondary"|"ghost";
  children?: React.ReactNode;
}

function Button({ title, iconName, onPress, style, colorIcon }: ButtonProps) {
  return (
    <View className="bg-primary  rounded-full mx-4 px-4 py-6 my-4">
      <TouchableOpacity
        className="flex-row items-center justify-center gap-1"
        onPress={onPress}
        style={style}
      >
        {iconName && (
          <MaterialIcons
            name={iconName}
            size={24}
            color={colorIcon ?? VAR?.ICON_COLOR}
          />
        )}
        <Text className="text-lg text-text font-semibold ">{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Button;
