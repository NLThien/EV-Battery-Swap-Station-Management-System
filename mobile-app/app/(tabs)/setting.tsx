import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SettingScreen = () => {
    return (
        <View style={styles.container}>
          <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-red-500">
        Welcome to Nativewind!
      </Text>
    </View>
        </View>
    );
};

export default SettingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 32,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#1976d2',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});