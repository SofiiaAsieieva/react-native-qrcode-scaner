import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

export default function List({ data }) {
  const [users, setUsers] = useState([{
    name: '',
    surname: '',
    email: '',
    phone: '',
  }]);
  
  const addUser = () => {
    const firstAndLastName = data.N.split(';');
  
    setUsers(prevUsers =>([...prevUsers, {
      name: firstAndLastName[0],
      surname: firstAndLastName[1],
      email: data.EMAIL,
      phone: data.TEL,
    }]))
  }
  
  return (
    <View>
      <Text>
        {users.map(user => (
          <Text>{ user.name }</Text>
        ))}
      </Text>
    </View>
  )
}
