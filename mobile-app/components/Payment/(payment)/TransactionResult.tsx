import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface TransactionResultProps {
  status: 'success' | 'failure';
  title: string;
  message?: string;
  onButtonPress: () => void;
  buttonTitle: string;
}

const TransactionResult: React.FC<TransactionResultProps> = ({
  status,
  title,
  message,
  onButtonPress,
  buttonTitle,
}) => {
  const isSuccess = status === 'success';

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className={`text-6xl mb-5 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
        {isSuccess ? '✓' : '✗'}
      </Text>

      <Text className={`text-2xl font-bold mb-2 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
        {title}
      </Text>

      {message && <Text className="text-gray-600 text-center text-base">{message}</Text>}

      <TouchableOpacity
        onPress={onButtonPress}
        className="mt-8 w-3/5 bg-blue-600 py-3 rounded-full items-center"
      >
        <Text className="text-white font-semibold text-base">{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TransactionResult;
