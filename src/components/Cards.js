import React from 'react';
import { Text, View, StyleSheet, ScrollView, Button } from 'react-native';

export default function Cards({ users, removeUser }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        {users.map(user => (
          <View key={user.id} style={styles.cards}>

            <View style={styles.cardsContainerName}>
              <Text>name: </Text>
              <Text style={styles.cardsName}>
                {user.name}
              </Text>
            </View>

            <Text>{`email: ${user.email}`}</Text>
            <Text>{`phone: ${user.phone}`}</Text>
            <Button
              title="Delete"
              onPress={() => removeUser(user.id)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '80%',
    marginBottom: 20,
  },

  cards: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    color: '#666',
    backgroundColor: '#eaeaea',
  },

  cardsName: {
    fontWeight: '700',
    fontSize: 16,
  },

  cardsContainerName: {
    flexDirection: 'row',
  },
});
