import {
  UpdateUser,
  UserUpdate,
} from "@/api/authenticationService/editMyInfor";
import Button from "@/components/button";
import CustomInput from "@/components/custom-input";
import Header from "@/components/header";
import { useAuth } from "@/constants/authContext";
import { formatBirthdayToApi, formatBirthdayToUI } from "@/utils/formatDate";
import {
  formatPhoneNumberLocal,
  formatPhoneNumberVN,
} from "@/utils/formatPhoneNumber";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// nếu bạn để file khác thì chỉnh lại đường dẫn

function EditUserScreen() {
  const { updateUser } = useAuth();
  const params = useLocalSearchParams();
  const router = useRouter();
  const user = JSON.parse(params.user as string) as UserUpdate;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserUpdate>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: formatPhoneNumberLocal(user.phoneNumber), // đổi từ phone -> phoneNumber
      birthday: formatBirthdayToUI(user.birthday), // nếu backend trả yyyy-MM-dd mà bạn muốn dd/mm/yyyy thì có thể format lại ở đây
    },
    mode: "onChange",
  });

  const onPressBack = () => {
    router.back();
  };

  const onSubmit = async (data: UserUpdate) => {
    const formatPhone = formatPhoneNumberVN(data.phoneNumber);
    const formatDate = formatBirthdayToApi(data.birthday);
    console.log("Dữ liệu update:", formatPhone + " " + formatDate);
    try {
      const res = await UpdateUser({
        ...data,
        phoneNumber: formatPhone,
        birthday: formatDate,
      });
      if (res) {
        Alert.alert("Thành công", "Thay đổi thông tin tài khoản thành công", [
          {
            text: "OK",
            onPress: onPressBack,
          },
        ]);
        updateUser(data);
        return res;
      }
    } catch (error) {
      console.log("lỗi: " + error);
      Alert.alert("Thất bại", "Có thể bị trùng số điện thoạt hoặc email");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1">
        <View className="flex-1">
          {/* Header */}
          <Header
            iconLeft="chevron-left"
            onPressIconLeft={onPressBack}
            title="Chỉnh sửa"
          />

          {/* chỉnh sửa thông tin người dùng */}
          <View className="flex-col mt-6 space-y-4 gap-2 px-4">
            {/* Họ & Tên */}
            <View className="flex-row items-center space-x-4 gap-2">
              {/* Họ */}
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
                {errors.firstName && (
                  <Text className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </Text>
                )}
              </View>

              {/* Tên */}
              <View className="flex-1 flex-col gap-2">
                <Text className="text-xl font-semibold text-text">Tên *</Text>
                <Controller
                  control={control}
                  name="lastName"
                  rules={{ required: "Tên không được để trống" }}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput value={value} onChangeText={onChange} />
                  )}
                />
                {errors.lastName && (
                  <Text className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </Text>
                )}
              </View>
            </View>

            {/* Email */}
            <View className="flex-col gap-2">
              <Text className="text-xl font-semibold text-text">Email *</Text>
              <Controller
                control={control}
                name="email"
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
                Số điện thoại *
              </Text>
              <Controller
                control={control}
                name="phoneNumber"
                rules={{
                  required: "Số điện thoại không được để trống",
                  pattern: {
                    value: /^(0|\+84)(1|3|5|7|8|9)\d{8}$/,
                    message:
                      "Số điện thoại không hợp lệ (VD: 0987654321 hoặc +84987654321)",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <CustomInput
                    iconName="phone"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="phone-pad"
                  />
                )}
              />
              {errors.phoneNumber && (
                <Text className="text-red-500 text-sm">
                  {errors.phoneNumber.message}
                </Text>
              )}
            </View>

            {/* Ngày sinh */}
            <View className="flex-col gap-2">
              <Text className="text-xl font-semibold text-text">
                Ngày sinh *
              </Text>
              {/* sau này bạn thay bằng DatePicker cũng giữ name="birthday" là được */}
              <Controller
                control={control}
                name="birthday"
                rules={{
                  required: "Ngày sinh không được để trống",
                  pattern: {
                    value:
                      /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[0-2])[\/\-]\d{4}$/,
                    message: "Định dạng phải là dd/mm/yyyy",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <CustomInput
                    iconName="calendar-today"
                    placeholder="dd/mm/yyyy"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.birthday && (
                <Text className="text-red-500 text-sm">
                  {errors.birthday.message}
                </Text>
              )}
            </View>
          </View>

          {/* nút xác nhận sửa */}
          <View className="mt-6 px-4">
            <Button title="Xác nhận" onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default EditUserScreen;
