import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Button, View, Modal, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Scanner from './src/components/Scanner';
import Cards from './src/components/Cards';
import SplashScreenDemo from './src/components/SplashScreen';

export default function App() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [splashScreen, setSplashScreen] = React.useState(false);

  const onCodeScanned = (data) => {
    addUser(data);
    setModalVisible(false);
  };

  const save = async () => {
    try {
      await AsyncStorage.setItem("savedUsers", JSON.stringify(users))
    } catch (err) {
      console.log(err)
    }
  };

  const addUser = (userInfo) => {
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
    timerSplashScreen();
  }, []);

  useEffect(() => {
    save();
  }, [users])

  const removeUser = (userId) => {
    const filterUsers = users.filter(user => user.id !== userId);
    
    setUsers(filterUsers);
  };

  const timerSplashScreen = () => {
    setTimeout(() => {
      setSplashScreen(true);
    }, 1000)
  }

  return (
    <View style={styles.container}>

      {!splashScreen && <SplashScreenDemo />}

      {splashScreen && (
        <View>
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
            style={styles.modal}
          >
            <View style={styles.modalScanner}>
              <Scanner
                onCodeScanned={onCodeScanned}
                setModalVisible={setModalVisible}
              />

              <Button
                title="Close"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </Modal>

          {users.length !== 0 &&(
            <Cards
              users={users}
              removeUser={removeUser}
            />
          )}

          <StatusBar style="auto" />

          <Button
            title="Start"
            onPress={() => setModalVisible(true)}
          />
        </View>
      )}
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
  },
  modalScanner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "lightblue",
  }
});
