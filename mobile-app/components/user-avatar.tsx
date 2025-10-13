import React from "react";
import { StyleSheet, Text, View } from "react-native";

type UserAvatarProps = {
  name: string; // Tên người dùng
  size?: number; // Kích thước avatar (width/height)
  backgroundColor?: string; // Màu nền
  textColor?: string; // Màu chữ
};

const UserAvatar = ({
  name,
  size = 40,
  backgroundColor = "#8e7a6b",
  textColor = "#ffffff",
}: UserAvatarProps) => {
  // Lấy chữ cái đầu (Nếu có tên đầy đủ -> lấy ký tự đầu tiên)
  const initial = name?.trim()?.charAt(0)?.toUpperCase() || "?";

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            fontSize: size * 0.5,
            color: textColor,
          },
        ]}
      >
        {initial}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "600",
  },
});

export default UserAvatar;
