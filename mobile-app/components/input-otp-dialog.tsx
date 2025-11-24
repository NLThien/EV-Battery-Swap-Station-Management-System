import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import OTPTextInput from "react-native-otp-textinput";
import { SpinnerButton } from "./SpinnerButton";

type OTPDialogProps = {
  visible: boolean;
  value: string;
  onChange: (code: string) => void;
  onConfirm: (code: string) => void;
  onClose?: () => void;
  pinCount?: number;
  title?: string;
  isSubmitting?: boolean;
};

export const OTPDialog: React.FC<OTPDialogProps> = ({
  visible,
  value,
  onChange,
  onConfirm,
  onClose,
  pinCount = 6,
  title = "Nhập mã OTP",
  isSubmitting = false,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {isSubmitting && <SpinnerButton />}
      <View className="flex-1 bg-black/40 justify-center items-center px-4">
        <View className="bg-white p-6 rounded-2xl w-full max-w-md">
          <Text className="text-xl font-semibold mb-4 text-center">
            {title}
          </Text>
          <Text className="text-center mt-3">
            Mã OTP đã được gửi về số điện thoại của bạn
          </Text>

          {/* OTP Input */}
          <OTPTextInput
            inputCount={pinCount}
            tintColor="#3b82f6"
            offTintColor="#bdbdbd"
            textInputStyle={{
              width: 45,
              height: 55,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "#3b82f6",
              //   color: "#000",
              //   fontSize: 20,
            }}
            handleTextChange={(code) => {
              onChange(code);
              if (code.length === pinCount) {
                onConfirm(code); // auto submit khi nhập đủ
              }
            }}
          />

          <TouchableOpacity
            className="bg-blue-500 p-3 rounded-xl mt-5 flex-row justify-center items-center"
            disabled={value.length !== pinCount}
            onPress={() => onConfirm(value)}
          >
            <Text className="font-semibold text-white">Xác nhận</Text>
          </TouchableOpacity>

          {onClose && (
            <TouchableOpacity className="mt-3" onPress={onClose}>
              <Text className="text-center text-blue-600">Huỷ</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};
