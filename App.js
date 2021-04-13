import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Button, View, Modal } from "react-native";

import Scanner from "./src/components/Scanner";
import List from "./src/components/List";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [modalVisible, setModalVisible] = React.useState(false);
  
  const [users, setUsers] = React.useState([]);
  
  const onCodeScanned = (data) => {
    addUser(data);
    setModalVisible(false);
  };
  
  const save = async () => {
    try {
      await AsyncStorage.setItem("savedUsers", JSON.stringify(users))
      console.log(JSON.stringify(users))
    } catch (err) {
      console.log(err)
    }
  };
  
  const addUser = (user) => {
    const firstAndLastName = user.N.split(';');
    const userInfo = {
      id: new Date().getTime(),
      name: firstAndLastName.join(' '),
      email: user.EMAIL,
      phone: user.TEL,
    };
  
    setUsers(prevUsers =>([...prevUsers, userInfo]));
  };
  
  const load = async  () => {
    try {
      let users = await AsyncStorage.getItem("savedUsers");
      
      if (users !== null) {
        setUsers(JSON.parse(users));
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    load();
  }, []);
  
  useEffect(() => {
    save();
  }, [users])
  
  const removeUser = (userId) => {
    const filterUsers = users.filter(user => user.id !== userId);
    
    setUsers(filterUsers);
  };
  
  return (
    <View style={styles.container}>
      
      {users.length !== 0 &&(
        <List
          users={users}
          removeUser={removeUser}
        />
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
