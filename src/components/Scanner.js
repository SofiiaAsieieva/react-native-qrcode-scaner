import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ToastAndroid } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { receiveDataFromQrCode } from '../helpes';

export default function Scanner({ onCodeScanned, setModalVisible }) {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async() => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();

      setHasPermission(status === 'granted');
    })();
  }, []);

  const toastWithDurationHandler = () => {
    ToastAndroid.showWithGravity(
      'Incorrectly entered user data',
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
  };

  const handleBarCodeScanned = ({ data }) => {
    const userInfo = receiveDataFromQrCode(data);

    if (!userInfo) {
      toastWithDurationHandler();
      setModalVisible(false);
    } else {
      onCodeScanned(userInfo);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={styles.container}
    >
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '90%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});
