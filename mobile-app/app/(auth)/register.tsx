import {
  Register,
  RegisterRequest,
} from "@/api/authenticationService/register";
import Button from "@/components/button";
import CustomInput from "@/components/custom-input";
import Header from "@/components/header";
import { OTPDialog } from "@/components/input-otp-dialog";
import { SpinnerButton } from "@/components/SpinnerButton";
import { useAuth } from "@/constants/authContext";
import { formatBirthdayToApi } from "@/utils/formatDate";
import { formatPhoneNumberVN } from "@/utils/formatPhoneNumber";
import {
  FirebaseAuthTypes,
  getAuth,
  signInWithPhoneNumber,
} from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type RegisterFormValues = RegisterRequest & {
  confirmPassword: string;
};

function RegisterScreen() {
  const { authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false); // mở/đóng dialog OTP
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null); // object xác nhận OTP
  const [otp, setOtp] = useState(""); // mã otp
  const [loadingOtp, setLoadingOtp] = useState(false);

  const router = useRouter();
  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      birthday: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
    criteriaMode: "all",
  });

  const password = useWatch({ control, name: "password" });

  const onPressBack = () => {
    router.back();
  };

  const onSubmit = async (code: string) => {
    try {
      console.log("OTP gửi lên server:", code);

      if (!confirm) {
        console.log("Chưa có confirmation — chưa gửi OTP");
        throw new Error("NO_CONFIRMATION");
      }
      await confirm.confirm(code);

      // call API đăng ký
      try {
        const data = getValues();
        console.log("Dữ liệu đăng ký:", data);
        const birthdayApi = formatBirthdayToApi(data.birthday);
        const formatPhone = formatPhoneNumberVN(data.phoneNumber);

        const payload: RegisterRequest = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: formatPhone,
          birthday: birthdayApi,
          password: data.password,
        };
        const res = await Register(payload);
        console.log("OTP confirmed — login success");
        if (res) {
          Alert.alert(
            "Đăng ký thành công",
            "Đăng ký tài khoản thành công, vui lòng đăng nhập",
            [
              {
                text: "OK",
                onPress: onPressBack,
              },
            ]
          );

          return res;
        }
      } catch (error) {
        console.log("lỗi đăng kí: " + error);
        Alert.alert(
          "Đăng kí thất bại",
          "Có thể bị trùng số điện thoạt hoặc email"
        );
      }
      setVisible(false);
      setOtp("");
    } catch (error) {
      setLoadingOtp(false);
      console.log("Mã xác thực không hợp lệ:", error);
      Alert.alert("Lỗi", "OTP không hợp lệ");
    }
  };

  const onPressRegisterButton = async (data: RegisterFormValues) => {
    try {
      setLoadingOtp(true);
      const formatPhone = formatPhoneNumberVN(data.phoneNumber); // +84...
      console.log("Gửi OTP tới:", formatPhone);

      // dùng API mới của react-native-firebase
      const confirmation = await signInWithPhoneNumber(getAuth(), formatPhone);

      setConfirm(confirmation);
      setLoadingOtp(false);
      setVisible(true);
    } catch (error) {
      setLoadingOtp(false);
      console.log("Error sending OTP:", error);
      Alert.alert("Lỗi", "Không gửi được OTP. Vui lòng thử lại.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={{
          flex: 1,
          // Trên Android: cộng thêm chiều cao thanh trạng thái nếu cần
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}
      >
        {loadingOtp && <SpinnerButton />}
        {/* Dialog nhập OTP */}
        <OTPDialog
          visible={visible}
          value={otp}
          onChange={setOtp}
          onConfirm={onSubmit}
          onClose={() => {
            setVisible(false);
            setOtp("");
          }}
          isSubmitting={authLoading}
          pinCount={6}
          title="Nhập mã OTP để xác thực"
        />
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
                  Ngày sinh
                </Text>

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

                {/* 🔥 Warning message xuất hiện tại đây */}
                {errors.birthday && (
                  <Text className="text-red-500 text-sm">
                    {errors.birthday.message}
                  </Text>
                )}
              </View>

              {/* Mật khẩu */}
              <View className="flex-col gap-2">
                <Text className="text-xl font-semibold text-text">
                  Mật khẩu *
                </Text>
                <Controller
                  control={control}
                  name="password"
                  rules={{
                    required: "Mật khẩu không được để trống",
                    minLength: {
                      value: 8,
                      message: "Mật khẩu phải có ít nhất 8 ký tự",
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

            {/* nút xác nhận đăng ký */}
            <View className="mt-8 px-4">
              <Button
                title="Đăng ký"
                onPress={handleSubmit(onPressRegisterButton)}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default RegisterScreen;
