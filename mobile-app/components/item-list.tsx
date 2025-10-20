import { FeedbackItem } from "@/api/mockApi";
import { Pressable, Text, View } from "react-native";
import UserAvatar from "./user-avatar";

interface ItemLIstProp {
  item: FeedbackItem;
  onPress?: (detail: FeedbackItem) => void;
}

function ItemList({ item, onPress }: ItemLIstProp) {
  const currentDate = new Date(item.createdAt);
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = currentDate.toLocaleDateString("vi-VN", dateOptions);

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
  };

  const formattedTime = currentDate.toLocaleTimeString("vi-VN", timeOptions);

  return (
    <Pressable onPress={() => onPress?.(item)}>
      <View className="h-20 w-full flex-row items-center px-3 rounded-lg shadow-sm elevation-md bg-[#A8D4FF]">
        <UserAvatar name={item.description} size={45} />
        {/* title */}
        <View className="flex-1  p-2 flex-col justify-center h-full w-full">
          <Text
            className="text-2xl font-bold "
            numberOfLines={1}
            ellipsizeMode="clip"
          >
            {item.description}
          </Text>
          <Text>
            {formattedTime} {formattedDate}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ItemList;
