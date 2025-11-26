import Button from "@/components/button";
import CustomInput from "@/components/custom-input";
import { OTPDialog } from "@/components/input-otp-dialog";
import { SpinnerButton } from "@/components/SpinnerButton";
import { useAuth } from "@/constants/authContext";
import { VAR } from "@/constants/varriable";
import { formatPhoneNumberVN } from "@/utils/formatPhoneNumber";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  FirebaseAuthTypes,
  getAuth,
  signInWithPhoneNumber,
} from "@react-native-firebase/auth";

type SignInFormValues = {
  phoneNumber: string;
  password: string;
};

export default function SignIn() {
  const { signIn, authLoading } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [otp, setOtp] = useState(""); // mã otp
  const [visible, setVisible] = useState(false); // mở/đóng dialog OTP
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null); // object xác nhận OTP
  const [isSecure, setIsSecure] = useState(true);
  const [loadingOtp, setLoadingOtp] = useState(false);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignInFormValues>({
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  const handleConfirm = async (code: string) => {
    try {
      console.log("OTP gửi lên server:", code);

      if (!confirm) {
        console.log("Chưa có confirmation — chưa gửi OTP");
        throw new Error("NO_CONFIRMATION");
      }

      // Xác thực OTP với Firebase
      await confirm.confirm(code);
      console.log("OTP confirmed — login success");

      // OTP OK → gọi API đăng nhập backend
      try {
        const data = getValues();
        const formatPhone = formatPhoneNumberVN(data.phoneNumber);

        await signIn({
          phoneNumber: formatPhone,
          password: data.password,
        });

        console.log("Đăng nhập thành công");
        router.replace("/(app)/(tabs)");
      } catch (err: any) {
        console.log("Lỗi đăng nhập:", err);
        if (err?.message === "ROLE_NOT_ALLOWED") {
          Alert.alert(
            "Không thể đăng nhập",
            "Tài khoản này không được phép sử dụng ứng dụng mobile."
          );
          return;
        }
        Alert.alert("Đăng nhập thất bại", "Sai số điện thoại hoặc mật khẩu");
      }

      setVisible(false);
      setOtp("");
    } catch (e) {
      console.log("Mã xác thực không hợp lệ:", e);
      Alert.alert("Lỗi", "OTP không hợp lệ");
    }
  };

  const onPressButtonLogin = async (data: SignInFormValues) => {
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
      console.log("Error sending OTP:", error);
      Alert.alert("Lỗi", "Không gửi được OTP. Vui lòng thử lại.");
    }
  };

  const onPressRegister = () => {
    router.push("/register");
  };

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
        }}
      >
        {loadingOtp && <SpinnerButton />}

        {/* Dialog nhập OTP */}
        <OTPDialog
          visible={visible}
          value={otp}
          onChange={setOtp}
          onConfirm={handleConfirm}
          onClose={() => {
            setVisible(false);
            setOtp("");
          }}
          isSubmitting={authLoading}
          pinCount={6}
          title="Nhập mã OTP để xác thực"
        />

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? insets.top : 0}
        >
          <View style={{ flex: 1, paddingHorizontal: 12 }}>
            {/* Logo */}
            <View className="items-center mt-24">
              <Image
                source={require("../../assets/logo/logo.png")}
                style={{ width: 150, height: 150 }}
              />
            </View>

            {/* Số điện thoại */}
            <View className="mt-8">
              <Text className="font-bold text-xl">Số điện thoại</Text>
              <Controller
                control={control}
                name="phoneNumber"
                rules={{
                  required: "Vui lòng nhập số điện thoại",
                  pattern: {
                    value: /^(0|\+84)(3|5|7|8|9)\d{8}$/,
                    message: "Số điện thoại không hợp lệ",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <CustomInput
                    value={value}
                    onChangeText={onChange}
                    keyboardType="phone-pad"
                  />
                )}
              />
              {errors.phoneNumber && (
                <Text className="text-red-500 mt-1">
                  {errors.phoneNumber.message}
                </Text>
              )}
            </View>

            {/* Mật khẩu */}
            <View className="mt-6">
              <Text className="font-bold text-xl">Mật khẩu</Text>
              <Controller
                control={control}
                name="password"
                rules={{
                  required: "Vui lòng nhập mật khẩu",
                  minLength: {
                    value: 8,
                    message: "Mật khẩu phải có ít nhất 8 ký tự",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <CustomInput
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={isSecure}
                  />
                )}
              />
              {errors.password && (
                <Text className="text-red-500 mt-1">
                  {errors.password.message}
                </Text>
              )}

              {/* Hiện mật khẩu */}
              <Pressable
                onPress={() => setIsSecure(!isSecure)}
                className="self-start items-center"
                style={{ flexDirection: "row", marginTop: 12 }}
              >
                <MaterialIcons
                  name={isSecure ? "check-box-outline-blank" : "check-box"}
                  size={24}
                  color={isSecure ? VAR.ICON_COLOR : VAR.PRIMARY_COLOR}
                />
                <Text style={{ marginLeft: 4 }}>Hiện mật khẩu</Text>
              </Pressable>
            </View>

            {/* Đăng ký */}
            <View className="flex-row mt-5 items-center">
              <Text className="text-xl">Bạn chưa có tài khoản?</Text>
              <TouchableOpacity className="px-2 py-1" onPress={onPressRegister}>
                <Text className="text-xl font-semibold">Đăng ký</Text>
              </TouchableOpacity>
            </View>

            {/* Nút đăng nhập */}
            <View
              style={{ marginTop: "auto", paddingBottom: insets.bottom + 12 }}
            >
              <Button
                title={authLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                onPress={handleSubmit(onPressButtonLogin)}
                // có thể disable khi đang loading hoặc đang chờ OTP:
                // disabled={authLoading || visible}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
