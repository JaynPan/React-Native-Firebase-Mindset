import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import * as firebase from 'firebase';

import { useAuth } from '../context/AuthProvider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function DashboardScreen() {
  const { uid } = useAuth();
  const [userInfo, setUserInfo] = useState(null);

  const signOut = () => {
    firebase.auth().signOut().then(function() {
      console.log('sign out successful')
    }).catch(function(error) {
      console.log('sign out error', error);
    });
  }

  const getUserInfo = async () => {
    const doc = await firebase.firestore().collection('users').doc(uid).get();

    setUserInfo(doc.data())
  }

  useEffect(() => {
    if(uid) {
      getUserInfo();
    }
  }, [uid])

  return (
    <View style={styles.container}>
      <Text>Hello: {userInfo?.first_name} {userInfo?.last_name}</Text>
      <Button onPress={signOut} title="sign out" />
    </View>
  )
}
