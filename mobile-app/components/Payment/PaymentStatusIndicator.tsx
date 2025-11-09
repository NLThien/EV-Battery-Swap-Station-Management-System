import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface PaymentStatusIndicatorProps {
  text: string;
}

const PaymentStatusIndicator: React.FC<PaymentStatusIndicatorProps> = ({ text }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" style={{ marginRight: 10 }} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});

export default PaymentStatusIndicator;