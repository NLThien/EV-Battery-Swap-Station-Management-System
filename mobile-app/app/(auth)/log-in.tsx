import Button from "@/components/button";
import CustomInput from "@/components/custom-input";
import { useAuth } from "@/constants/authContext";
import { VAR } from "@/constants/varriable";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function SignIn() {
  const { signIn } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [username] = useState("demo");
  const [isSecure, setIsSecure] = useState(true);

  const onPressLogin = async () => {
    await signIn(username, "password");
    router.replace("/(app)/(tabs)"); // ✅ dùng đường dẫn tuyệt đối
  };
  const onPressRegister = () => {
    router.push("/register");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"} // ✅ Android có hiệu lực
          keyboardVerticalOffset={Platform.OS === "ios" ? insets.top : 0} // ✅ bù safe area iOS
        >
          <View style={{ flex: 1, paddingHorizontal: 12 }}>
            {/* Logo */}
            <View className="items-center mt-24">
              <Image
                source={require("../../assets/logo/logo.png")}
                style={{ width: 150, height: 150 }}
              />
            </View>

            {/* Form */}
            <View className="mt-8">
              <Text className="font-bold text-xl">Tên đăng nhập</Text>
              <CustomInput />
            </View>

            <View className="mt-6">
              <Text className="font-bold text-xl">Mật khẩu</Text>
              <CustomInput secureTextEntry={isSecure} />

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
            {/* chỗ đăng kí */}
            <View className="flex-row mt-5 items-center">
              <Text className="text-xl">Bạn chưa có tài khoản?</Text>
              <TouchableOpacity className="px-2 py-1" onPress={onPressRegister}>
                <Text className="text-xl font-semibold">Đăng ký</Text>
              </TouchableOpacity>
            </View>

            {/* Nút luôn ở đáy – không bị che */}
            <View
              style={{ marginTop: "auto", paddingBottom: insets.bottom + 12 }}
            >
              <Button title="Đăng nhập" onPress={onPressLogin} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
