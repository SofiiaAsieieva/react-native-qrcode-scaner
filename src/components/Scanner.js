import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

function convertToObject(sourceString) {
  const result = {};
  const copy = sourceString;
  
  if(sourceString === '') {
    return {};
  }
  
  copy
    .split('\n')
    .map(sentence => sentence.split(':'))
    .map((value) => {
      result[value[0]] = value[1];
    });
  
  return result;
}

export default function Scanner({onCodeScanned}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  
  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    onCodeScanned(convertToObject(data));
  };
  
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  
  return (
    <View
      style={{
        width: "100%",
        height: "90%",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? false : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}
