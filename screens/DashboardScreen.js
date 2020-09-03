import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import * as firebase from 'firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function DashboardScreen() {
  const handleClick = () => {
    firebase.firestore()
      .collection('test')
      .add({
        name: 'test'
      })
      .then((data) => console.log(data))
  }

  return (
    <View style={styles.container}>
      <Button onPress={handleClick} title="press" />
      <Text>Dashboard</Text>
    </View>
  )
}
