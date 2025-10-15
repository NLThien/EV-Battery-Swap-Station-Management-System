import Button from "@/components/button";
import CustomInput from "@/components/custom-input";
import Header from "@/components/header";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function EditUserScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const user = JSON.parse(params.user as string);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      birthday: user.birthday,
    },
  });

  const onPressBack = () => {
    router.back();
  };

  const onSubmit = (data: object) => {
    console.log(data);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1">
        <View>
          {/* Header */}
          <Header
            iconLeft="chevron-left"
            onPressIconLeft={onPressBack}
            title="Chỉnh sửa"
          />

          {/* chỉnh sửa thông tin người dùng */}
          <View className="flex-col mt-6 space-y-4 gap-2 px-4">
            {/* input đổi tên */}
            <View className="flex-row items-center space-x-4 gap-2">
              <View className="flex-col flex-1 gap-2">
                {/* họ */}
                <Text className="text-xl font-semibold text-text">Họ </Text>
                {/* input nhap ho */}
                <Controller
                  control={control}
                  name="firstName"
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput value={value} onChangeText={onChange} />
                  )}
                />
              </View>
              {/* tên */}
              <View className=" flex-1 flex-col gap-2">
                <Text className="text-xl font-semibold text-text"> Tên</Text>
                {/* input nhap ten */}
                <Controller
                  control={control}
                  name="lastName"
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput value={value} onChangeText={onChange} />
                  )}
                />
              </View>
            </View>
            {/* Email  */}
            <View className="flex-col gap-2">
              <Text className="text-xl font-semibold text-text">Email</Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    iconName="email"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="email-address"
                  />
                )}
              />
            </View>
            {/* phone */}
            <View className="flex-col gap-2">
              <Text className="text-xl font-semibold text-text">
                Số điện thoại
              </Text>
              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    iconName="phone"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="phone-pad"
                  />
                )}
              />
            </View>
            {/* ngày sinh */}
            <View className="flex-col gap-2">
              <Text className="text-xl font-semibold text-text">Email</Text>
              {/* cái này sửa sau dùng tiw viện react-native-date-picker */}
              <Controller
                control={control}
                name="birthday"
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    iconName="calendar-today"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>
          </View>
          {/* nút xác nhận sửa */}
          <View>
            <Button title="Xác nhận" onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default EditUserScreen;
