import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { TextInput, TextInputProps, View } from "react-native";

interface CustomInputProps extends TextInputProps {
  iconName?: keyof typeof MaterialIcons.glyphMap;
  // placeholder?: string;
  value: string;
  // onChangeText: (text: string) => void;
  // onBlur?: () => void;
}

function CustomInput({
  iconName,
  value,
  onChangeText,
  ...props
}: CustomInputProps) {
  const [focused, setFocused] = useState(false);
  return (
    <View
      className={`flex-row items-center border rounded-lg p-2
       ${
         focused
           ? "border-blue-500  bg-white "
           : "border-blue-700 bg-[#A8D4FF]  "
       }`}
    >
      <MaterialIcons
        name={iconName}
        color={`${focused ? "#3b82f6" : " #374151"}`}
        size={24}
      />
      <TextInput
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        value={value}
        onChangeText={onChangeText}
        className={` flex-1 h-12 text-text text-lg border-0 border-transparent 
           ${focused ? "font-semibold" : "font-semibold"}`}
        {...props}
      />
    </View>
  );
}

export default CustomInput;
