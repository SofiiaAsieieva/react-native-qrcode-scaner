import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Button, View, Modal, Text } from "react-native";

import Scanner from "./src/components/Scanner";
import List from "./src/components/List";

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
      {data.length !== 0 &&(
        <List data={data} />
      )}
      
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modal}>
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
    alignItems: "center",
    justifyContent: "center",
    height: "80%",
    marginHorizontal: 20,
    backgroundColor: "#fff",
  },
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "lightgrey",
  },
});
