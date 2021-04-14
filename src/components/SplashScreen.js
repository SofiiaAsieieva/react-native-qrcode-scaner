import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SplashScreenDemo() {
  return (
    <View style={styles.splashScreen}>
      <Text>SplashScreen Demo! 👋</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  splashScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
