import Button from "@/components/button";
import CardItem from "@/components/cardItem";
import UserAvatar from "@/components/user-avatar";
import { useAuth } from "@/constants/authContext";
import { VAR } from "@/constants/varriable";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const Profile: React.FC = () => {
  const router = useRouter();
  const { signOut } = useAuth();

  const onPressProfileUser = () => {
    router.push("../../profileUser");
  };

  const onPresFeedback = () => {
    router.push("../../feedback");
  };
  const pressSignOut = async () => {
    await signOut(); // Gọi hàm signOut
    router.replace("/(auth)/log-in"); // Chuyển hướng sau khi đã đăng xuất
  };

  return (
    <SafeAreaView className="flex-1 ">
      <ScrollView>
        <View style={styles.container}>
          {/* chỗ này để hiển thị Avatar và tên người dùng */}
          <View className="h-44 flex-col justify-center items-center  gap-3">
            <View>
              <UserAvatar name="Nguyen Van A" size={70} />
            </View>
            <View>
              <Text className="text-3xl font-semibold">Nguyen Van Alo</Text>
            </View>
          </View>
          {/* Chỗ này để hiển thị thông tin tài khoản */}
          <View>
            <CardItem
              title="Thông tin tài khoản"
              iconName="person"
              isArrowRight
              onPress={onPressProfileUser}
            />
            <CardItem
              title="Gửi phản hồi hỗ trợ"
              iconName="feedback"
              isArrowRight
              onPress={onPresFeedback}
            />

            <CardItem
              title="Đổi mật khẩu"
              iconName="lock"
              isArrowRight
              onPress={() => {
                console.log("Change Password Pressed");
              }}
            />
            <CardItem
              title="Thông tin về ứng dụng"
              iconName="info"
              isArrowRight
              onPress={() => {
                console.log("App Info Pressed");
              }}
            />
          </View>
          <View className="">
            <Button
              title="Đăng xuất"
              iconName="logout"
              colorIcon={VAR.TEXT_COLOR}
              onPress={pressSignOut}
              style={{}}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

export default Profile;
