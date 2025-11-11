import React from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';

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
    <SafeAreaView style={styles.container}>
      <Text style={[styles.icon, isSuccess ? styles.iconSuccess : styles.iconFailure]}>
        {isSuccess ? '✓' : '✗'}
      </Text>
      <Text style={[styles.title, isSuccess ? styles.titleSuccess : styles.titleFailure]}>
        {title}
      </Text>
      {message && <Text style={styles.message}>{message}</Text>}
      <View style={{ marginTop: 30, width: '60%' }}>
        <Button title={buttonTitle} onPress={onButtonPress} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' },
  icon: { fontSize: 80, marginBottom: 20 },
  iconSuccess: { color: 'green' },
  iconFailure: { color: 'red' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  titleSuccess: { color: 'green' },
  titleFailure: { color: 'red' },
  message: { fontSize: 16, color: '#4B5563', textAlign: 'center' },
});

export default TransactionResult;