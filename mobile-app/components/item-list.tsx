import { Text, View } from "react-native";
import UserAvatar from "./user-avatar";

interface ItemLIstProp {
  id: number;
  description: string;
  createAt: string;
}

function ItemList({ id, description, createAt }: ItemLIstProp) {
  const currentDate = new Date(createAt);
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
    <View className="h-20 w-full flex-row items-center px-3 rounded-lg shadow-sm elevation-md bg-[#A8D4FF]">
      <UserAvatar name={description} size={45} />
      {/* title */}
      <View className="flex-1  p-2 flex-col justify-center h-full w-full">
        <Text
          className="text-2xl font-bold "
          numberOfLines={1}
          ellipsizeMode="clip"
        >
          {description}
        </Text>
        <Text>
          {formattedTime} {formattedDate}
        </Text>
      </View>
    </View>
  );
}

export default ItemList;
