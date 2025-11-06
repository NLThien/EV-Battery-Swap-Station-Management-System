import Button from "@/components/button";
import CustomInput from "@/components/custom-input";
import Header from "@/components/header";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function CreateFeedback() {
  const router = useRouter();
  const [feedback, setFeedback] = useState("");

  const onPressBack = () => {
    router.back();
  };

  const onPressSendFeedback = () => {
    console.log(feedback);
  };

  const onPressCall = () => {
    console.log("call...");
  };
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        <Header
          title="Gửi hỗ trợ"
          iconLeft="chevron-left"
          iconRight="phone-enabled"
          onPressIconLeft={onPressBack}
          onPressIconRight={onPressCall}
        />
        {/* Noi dung */}
        <View className="px-3 ">
          <View className="mt-8">
            <CustomInput
              className="min-h-24 text-xl"
              placeholder="Nhập yêu cầu của bạn..."
              multiline={true}
              value={feedback}
              onChange={(event) => setFeedback(event.nativeEvent.text)}
            />
          </View>
          <View>
            <Button title="Gửi" onPress={onPressSendFeedback} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default CreateFeedback;
