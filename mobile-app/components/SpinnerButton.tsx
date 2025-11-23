import { ActivityIndicator, Text, View } from "react-native";

export function SpinnerButton() {
  return (
    <View className="absolute inset-0 justify-center items-center bg-white/30 z-50">
      <View className="flex-row items-center px-6 py-3 rounded-full border border-gray-300 bg-white/80 shadow-lg">
        <ActivityIndicator size="small" color="#2563eb" className="mr-2" />
        <Text className="text-lg font-semibold text-gray-700">Loading...</Text>
      </View>
    </View>
  );
}
