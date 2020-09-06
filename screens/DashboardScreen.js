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
  const signOut = () => {
    firebase.auth().signOut().then(function() {
      console.log('sign out successful')
    }).catch(function(error) {
      console.log('sign out error', error);
    });
  }

  return (
    <View style={styles.container}>
      <Text>Dashboard</Text>
      <Button onPress={signOut} title="signOut" />
    </View>
  )
}
