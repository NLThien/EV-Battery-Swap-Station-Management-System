import { User } from "@/api/mockApi";
import Button from "@/components/button";
import CardItem from "@/components/cardItem";
import Header from "@/components/header";
import UserAvatar from "@/components/user-avatar";
import { useRouter, useSegments } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileUserScreen() {
  const router = useRouter();
  const segments = useSegments();
  console.log(segments);

  //chô nay bình thường thì sẽ lấy param id để fetch data user
  //nhưng do chưa có backend nên tạm thời lấy data từ mockApi
  const user = User;

  const onPressBack = () => {
    router.back();
  };

  const onPressEdit = () => {
    router.push({
      pathname: "../profileUser/editUser",
      params: { user: JSON.stringify(user) },
    });
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-background">
      <View className="flex-1">
        {/* Header */}
        <Header
          iconLeft="chevron-left"
          title="Thông tin người dùng"
          onPressIconLeft={onPressBack}
        />
        {/* Nội dung màn hình */}
        <View className="flex-1 px-4 py-2">
          {/* cardName */}
          <View className="flex-col justify-center items-center h-48 w-full rounded-2xl bg-[#A8D4FF] ">
            <UserAvatar name={user.firstName + " " + user.lastName} size={80} />
            <Text className="text-3xl font-semibold text-text mt-4">
              {user.firstName + " " + user.lastName}
            </Text>
          </View>
          {/* Thông tin chi tiết */}

          <View className="flex-col mt-6 space-y-4 gap-2">
            {/* card tên */}
            <View>
              <Text className="text-xl font-semibold text-text">Họ và Tên</Text>
              <CardItem
                style={{
                  backgroundColor: "#A8D4FF",
                  width: "100%",
                }}
                title={user.firstName + " " + user.lastName}
                iconName="person"
              />
            </View>
            {/* card email */}
            <View>
              <View className="flex-row items-center gap-2 ">
                <Text className="text-xl font-semibold text-text">Email</Text>
                <Text className="text-base text-gray-700 ">
                  *không bắt buộc
                </Text>
              </View>

              <CardItem
                style={{
                  backgroundColor: "#A8D4FF",
                  width: "100%",
                }}
                title={user.email}
                iconName="email"
              />
            </View>
            {/* card sđt */}
            <View>
              <Text className="text-xl font-semibold text-text">
                Số điện thoại
              </Text>
              <CardItem
                style={{
                  backgroundColor: "#A8D4FF",
                  width: "100%",
                }}
                title={user.phone}
                iconName="phone"
              />
            </View>
            {/* card ngày sinh */}
            <View>
              <Text className="text-xl font-semibold text-text">Ngày sinh</Text>
              <CardItem
                style={{
                  backgroundColor: "#A8D4FF",
                  width: "100%",
                }}
                title={user.birthday}
                iconName="cake"
              />
            </View>
          </View>
          {/* nút button */}
          <View className="mt-6">
            <Button title="Chỉnh sửa" onPress={onPressEdit} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
