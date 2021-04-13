import React, { useState, useEffect, useMemo } from "react";
import { Text, View, StyleSheet, ScrollView, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function List({ users, removeUser }) {
  
  return (
    <View style={styles.container}>
      <ScrollView>
        {users.map(user => (
          <View key={user.id} style={styles.cards}>
            <Text>{`name: ${user.name}`}</Text>
            <Text>{`email: ${user.email}`}</Text>
            <Text>{`phone: ${user.phone}`}</Text>
            <Button
              title={"Delete"}
              onPress={() => removeUser(user.id)}
            />
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
