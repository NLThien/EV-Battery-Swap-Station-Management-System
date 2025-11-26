import React from "react";
import { View, Image, ActivityIndicator } from "react-native";

interface QRCodeDisplayProps {
  uri: string | null;
}

export default function QRCodeDisplay({ uri }: QRCodeDisplayProps) {
  return (
    <View className="w-64 h-64 justify-center items-center bg-gray-200 rounded-lg border border-gray-300">
      {uri ? (
        <Image source={{ uri }} className="w-full h-full rounded-lg" />
      ) : (
        <ActivityIndicator size="large" color="#16A34A" />
      )}
    </View>
  );
}
