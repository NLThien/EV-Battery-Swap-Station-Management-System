import React from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';

interface QRCodeDisplayProps {
  uri: string | null;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ uri }) => {
  return (
    <View style={styles.container}>
      {uri ? (
        <Image source={{ uri:"https://qr.sepay.vn/img?acc=68209022004&bank=TPBank&amount=100000&des=TKPDHD DH102969" }} style={styles.qrCode} />
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  qrCode: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default QRCodeDisplay;