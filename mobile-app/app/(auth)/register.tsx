import Button from "@/components/button";
import CustomInput from "@/components/custom-input";
import Header from "@/components/header";
import { useRouter } from "expo-router";
import { Controller, useForm, useWatch } from "react-hook-form";

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

// Định nghĩa kiểu dữ liệu form
type RegisterFormValues = {
  userName: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthday: string;
};

function Register() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      userName: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      birthday: "",
    },
    mode: "onChange", // ✅ validate theo thời gian thực
    criteriaMode: "all",
  });

  const onPressBack = () => {
    router.back();
  };

  const onSubmit = (data: RegisterFormValues) => {
    console.log("Dữ liệu đăng ký:", data);
    // TODO: Thực hiện gọi API đăng ký tại đây
  };

  const password = useWatch({ control, name: "password" });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="flex-1">
        <Header
          title="Đăng ký"
          iconLeft="chevron-left"
          onPressIconLeft={onPressBack}
        />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? insets.top : 0}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          >
            <View className="flex-col mt-6 space-y-4 px-4">
              {/* Tên đăng nhập */}
              <View className="flex-col gap-2">
                <Text className="text-xl font-semibold text-text">
                  Tên đăng nhập *
                </Text>
                <Controller
                  control={control}
                  name="userName"
                  // ✨ ĐÃ THÊM message cho rules
                  rules={{ required: "Tên đăng nhập không được để trống" }}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      iconName="person"
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
                {errors.userName && (
                  <Text className="text-red-500 text-sm">
                    {errors.userName.message}
                  </Text>
                )}
              </View>

              {/* Họ và Tên */}
              <View className="flex-row items-center space-x-4">
                <View className="flex-col flex-1 gap-2">
                  <Text className="text-xl font-semibold text-text">Họ *</Text>
                  <Controller
                    control={control}
                    name="firstName"
                    rules={{ required: "Họ không được để trống" }}
                    render={({ field: { onChange, value } }) => (
                      <CustomInput value={value} onChangeText={onChange} />
                    )}
                  />
                  <View className="h-4">
                    {errors.firstName && (
                      <Text className="text-red-500 text-sm">
                        {errors.firstName.message}
                      </Text>
                    )}
                  </View>
                </View>
                <View className=" flex-1 flex-col gap-2">
                  <Text className="text-xl font-semibold text-text">Tên *</Text>
                  <Controller
                    control={control}
                    name="lastName"
                    // ✨ ĐÃ THÊM message cho rules
                    rules={{ required: "Tên không được để trống" }}
                    render={({ field: { onChange, value } }) => (
                      <CustomInput value={value} onChangeText={onChange} />
                    )}
                  />
                  <View className="h-4">
                    {errors.lastName && (
                      <Text className="text-red-500 text-sm">
                        {errors.lastName.message}
                      </Text>
                    )}
                  </View>
                </View>
              </View>

              {/* Email */}
              <View className="flex-col gap-2">
                <Text className="text-xl font-semibold text-text">Email *</Text>
                <Controller
                  control={control}
                  name="email"
                  // ✨ ĐÃ THÊM rules và message đầy đủ
                  rules={{
                    required: "Email không được để trống",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email không hợp lệ",
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      iconName="email"
                      value={value}
                      onChangeText={onChange}
                      keyboardType="email-address"
                    />
                  )}
                />
                {errors.email && (
                  <Text className="text-red-500 text-sm">
                    {errors.email.message}
                  </Text>
                )}
              </View>

              {/* Số điện thoại */}
              <View className="flex-col gap-2">
                <Text className="text-xl font-semibold text-text">
                  Số điện thoại
                </Text>
                <Controller
                  control={control}
                  name="phone"
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      iconName="phone"
                      value={value}
                      onChangeText={onChange}
                      keyboardType="phone-pad"
                    />
                  )}
                />
              </View>

              {/* Ngày sinh */}
              <View className="flex-col gap-2">
                {/* ✨ ĐÃ SỬA nhãn bị ghi nhầm là "Email" */}
                <Text className="text-xl font-semibold text-text">
                  Ngày sinh
                </Text>
                <Controller
                  control={control}
                  name="birthday"
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      iconName="calendar-today"
                      placeholder="dd/mm/yyyy"
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
              </View>

              {/* Mật khẩu */}
              <View className="flex-col gap-2">
                <Text className="text-xl font-semibold text-text">
                  Mật khẩu *
                </Text>
                <Controller
                  control={control}
                  name="password"
                  // ✨ ĐÃ THÊM rules và message
                  rules={{
                    required: "Mật khẩu không được để trống",
                    minLength: {
                      value: 6,
                      message: "Mật khẩu phải có ít nhất 6 ký tự",
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      iconName="lock"
                      value={value}
                      onChangeText={onChange}
                      secureTextEntry={true}
                    />
                  )}
                />
                {errors.password && (
                  <Text className="text-red-500 text-sm">
                    {errors.password.message}
                  </Text>
                )}
              </View>

              {/* Xác nhận mật khẩu */}
              <View className="flex-col gap-2">
                <Text className="text-xl font-semibold text-text">
                  Xác nhận mật khẩu *
                </Text>
                <Controller
                  control={control}
                  name="confirmPassword"
                  // ✨ ĐÃ THÊM rules kiểm tra khớp mật khẩu và message
                  rules={{
                    required: "Vui lòng xác nhận mật khẩu",
                    validate: (value) =>
                      value === password || "Mật khẩu xác nhận không khớp",
                  }}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      iconName="lock"
                      value={value}
                      onChangeText={onChange}
                      secureTextEntry={true}
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <Text className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </View>
            </View>

            {/* nút xác nhận đăng */}
            <View className="mt-8 px-4">
              <Button title="Đăng ký" onPress={handleSubmit(onSubmit)} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default Register;
