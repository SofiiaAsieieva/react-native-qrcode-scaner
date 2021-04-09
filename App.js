import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Button, View, Modal, Text } from "react-native";

import Scanner from "./src/components/Scanner";
import List from "./src/components/List";

function convertToObject(sourceString) {
  const result = {};
  
  if(sourceString === '') {
    return {};
  }
  
  sourceString
    .split('\n')
    .map(sentence => sentence.split(':'))
    .map((value) => {
    result[value[0]] = value[1];
  });
  
  return result;
}

export default function App() {
  const [modalVisible, setModalVisible] = React.useState(false);
  
  const [type, setType] = React.useState("");
  const [data, setData] = React.useState("");
  
  const onCodeScanned = (type, data) => {
    setType(type);
    setData(data);
    setModalVisible(false);
  };
  
  return (
    <View style={styles.container}>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modal}>
          {data.length > 0 &&(
            <List data={convertToObject(data)}/>
          )}
          
          <Scanner onCodeScanned={onCodeScanned} />
          
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
      
      <StatusBar style="auto" />
      
      <Button title="Start" onPress={() => setModalVisible(true)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "lightgrey",
  },
});
