import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import {
  Alert,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { changePasswordMyInfo } from "@/api/authenticationService/updatePassword";
import Button from "@/components/button";
import CustomInput from "@/components/custom-input";
import Header from "@/components/header";

export interface ChangePasswordProps {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

function UpdatePasswordScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordProps>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    mode: "onChange",
  });

  const currentPassword = useWatch({ control, name: "currentPassword" });
  const newPassword = useWatch({ control, name: "newPassword" });

  // state show / hide password
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onPressBack = () => {
    router.back();
  };

  const onSubmit = async (data: ChangePasswordProps) => {
    console.log("Dữ liệu đổi mật khẩu:", data);

    try {
      //call api đổi mật khẩu
      const res = await changePasswordMyInfo(data);

      Alert.alert("Thành công", "Mật khẩu đã được thay đổi", [
        { text: "OK", onPress: onPressBack },
      ]);
      return res;
    } catch (error) {
      console.log("Lỗi đổi mật khẩu:", error);
      Alert.alert(
        "Thất bại",
        "Đổi mật khẩu thất bại, vui lòng kiểm tra lại thông tin"
      );
    }
  };

  const renderCheckbox = (
    checked: boolean,
    onToggle: () => void,
    label: string
  ) => (
    <TouchableOpacity
      onPress={onToggle}
      className="flex-row items-center mt-1"
      activeOpacity={0.7}
    >
      <View
        className={`w-5 h-5 rounded border mr-2 justify-center items-center ${
          checked ? "border-blue-500" : "border-gray-400"
        }`}
      >
        {checked && <View className="w-3 h-3 rounded bg-blue-500" />}
      </View>
      <Text className="text-base text-text">{label}</Text>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          flex: 1,
          // Trên Android: cộng thêm chiều cao thanh trạng thái nếu cần
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          // Nên set màu nền
        }}
      >
        <View className="flex-1">
          {/* Header */}
          <Header
            iconLeft="chevron-left"
            onPressIconLeft={onPressBack}
            title="Đổi mật khẩu"
          />

          {/* Nội dung form */}
          <View className="mt-6 px-4 space-y-4">
            {/* Mật khẩu hiện tại */}
            <View className="flex-col gap-2">
              <Text className="text-xl font-semibold text-text">
                Mật khẩu hiện tại *
              </Text>
              <Controller
                control={control}
                name="currentPassword"
                rules={{
                  required: "Vui lòng nhập mật khẩu hiện tại",
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <CustomInput
                      iconName="lock"
                      value={value}
                      onChangeText={onChange}
                      secureTextEntry={!showCurrent}
                    />
                    {renderCheckbox(
                      showCurrent,
                      () => setShowCurrent((prev) => !prev),
                      "Hiện mật khẩu"
                    )}
                  </>
                )}
              />
              {errors.currentPassword && (
                <Text className="text-red-500 text-sm">
                  {errors.currentPassword.message}
                </Text>
              )}
            </View>

            {/* Mật khẩu mới */}
            <View className="flex-col gap-2">
              <Text className="text-xl font-semibold text-text">
                Mật khẩu mới *
              </Text>
              <Controller
                control={control}
                name="newPassword"
                rules={{
                  required: "Vui lòng nhập mật khẩu mới",
                  minLength: {
                    value: 8,
                    message: "Mật khẩu mới phải có ít nhất 8 ký tự",
                  },
                  validate: (value) =>
                    value !== currentPassword ||
                    "Mật khẩu mới không được trùng với mật khẩu hiện tại",
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <CustomInput
                      iconName="lock"
                      value={value}
                      onChangeText={onChange}
                      secureTextEntry={!showNew}
                    />
                    {renderCheckbox(
                      showNew,
                      () => setShowNew((prev) => !prev),
                      "Hiện mật khẩu"
                    )}
                  </>
                )}
              />
              {errors.newPassword && (
                <Text className="text-red-500 text-sm">
                  {errors.newPassword.message}
                </Text>
              )}
            </View>

            {/* Xác nhận mật khẩu mới */}
            <View className="flex-col gap-2">
              <Text className="text-xl font-semibold text-text">
                Xác nhận mật khẩu mới *
              </Text>
              <Controller
                control={control}
                name="confirmNewPassword"
                rules={{
                  required: "Vui lòng xác nhận mật khẩu mới",
                  validate: (value) =>
                    value === newPassword || "Mật khẩu xác nhận không khớp",
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <CustomInput
                      iconName="lock"
                      value={value}
                      onChangeText={onChange}
                      secureTextEntry={!showConfirm}
                    />
                    {renderCheckbox(
                      showConfirm,
                      () => setShowConfirm((prev) => !prev),
                      "Hiện mật khẩu"
                    )}
                  </>
                )}
              />
              {errors.confirmNewPassword && (
                <Text className="text-red-500 text-sm">
                  {errors.confirmNewPassword.message}
                </Text>
              )}
            </View>
          </View>

          {/* Nút xác nhận */}
          <View className="mt-8 px-4">
            <Button title="Xác nhận" onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default UpdatePasswordScreen;
