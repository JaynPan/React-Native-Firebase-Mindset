import React from 'react';
import {
  View, Text, StyleSheet, Button,
} from 'react-native';

import * as firebase from 'firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function SettingScreen() {
  const signOut = () => {
    firebase.auth().signOut().then(() => {
      console.log('sign out successful');
    }).catch((error) => {
      console.log('sign out error', error);
    });
  };

  return (
    <View style={styles.container}>
      <Text>Setting</Text>
      <Button onPress={signOut} title="sign out" />
    </View>
  );
}
