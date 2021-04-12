import React, { useState, useEffect, useMemo } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export default function List({ data }) {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    load();
    addUser()
    
    return (() => {
      save()
    })
    
  }, [])
  
  const addUser = () => {
    const dataToObject = convertToObject(data)
    const firstAndLastName = dataToObject.N.split(';');
  
    setUsers(prevUsers =>([...prevUsers, {
      id: new Date().getTime(),
      name: firstAndLastName[0],
      surname: firstAndLastName[1],
      email: dataToObject.EMAIL,
      phone: dataToObject.TEL,
    }]));
    console.log(1)
    save();
  };
  
  const save = async () => {
    try {
      await AsyncStorage.setItem("savedUsers", JSON.stringify(users))
        console.log(JSON.stringify(users))
    } catch (err) {
      console.log(err)
    }
  }
  
  const load = async  () => {
    try {
      let users = await AsyncStorage.getItem("savedUsers");
      
      if (users !== null) {
        setUsers(JSON.parse(users));
      }
    } catch (err) {
      console.log(err);
    }
  }
  
  const a = useMemo(addUser, [data]);
  
  return (
    <View style={styles.container}>
      <ScrollView>
        {users.map(user => (
          <View key={user.id} style={styles.cards}>
            <Text>{`name: ${user.name}`}</Text>
            <Text>{`surname: ${user.surname}`}</Text>
            <Text>{`email: ${user.email}`}</Text>
            <Text>{`phone: ${user.phone}`}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "80%",
    marginHorizontal: 20,
  },
  
  cards: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    color: "#666",
    backgroundColor: "#eaeaea",
  },
});
