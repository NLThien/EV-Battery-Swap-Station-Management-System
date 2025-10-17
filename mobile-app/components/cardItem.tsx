import { VAR } from "@/constants/varriable";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, Text, View } from "react-native";

type PropCardItem = {
  iconName?: keyof typeof MaterialIcons.glyphMap;
  title: string;
  onPress?: () => void;
  style?: object;
  colorIcon?: string;
  isArrowRight?: boolean;
};

function CardItem({
  iconName,
  title,
  onPress,
  style,
  colorIcon = VAR.ICON_COLOR,
  isArrowRight = false,
}: PropCardItem) {
  return (
    <Pressable onPress={onPress}>
      <View
        className=" flex-row justify-between items-center bg-card   p-4  rounded-lg shadow-lg elevation-lg  my-1 "
        style={style}
      >
        <View>
          <MaterialIcons
            className="p-2"
            color={colorIcon}
            name={iconName}
            size={30}
          />
        </View>
        <View className="flex-1 justify-center">
          <Text className="text-lg text-text font-semibold">{title}</Text>
        </View>
        {isArrowRight && (
          <View>
            <MaterialIcons
              className="p-2"
              color={VAR.ICON_COLOR}
              name="chevron-right"
              size={30}
            />
          </View>
        )}
      </View>
    </Pressable>
  );
}

export default CardItem;
