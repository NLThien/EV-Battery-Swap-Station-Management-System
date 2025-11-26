import React from 'react';
import { View, Image, ActivityIndicator } from 'react-native';

interface QRCodeDisplayProps {
  uri: string | null;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ uri }) => {
  return (
    <View className="w-64 h-64 justify-center items-center bg-gray-200 rounded-lg border border-gray-300">
      {uri ? (
        <Image source={{ uri }} className="w-full h-full" resizeMode="contain" />
      ) : (
        <ActivityIndicator size="large" color="#16A34A" />
      )}
    </View>
  );
};

export default QRCodeDisplay;
