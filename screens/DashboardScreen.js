import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
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
  const { uid, userInfo, setRefetchUserInfo } = useAuth();
  const [bio, setBio] = useState(userInfo?.bio || 'Write your own bio');

  const signOut = () => {
    firebase.auth().signOut().then(function() {
      console.log('sign out successful')
    }).catch(function(error) {
      console.log('sign out error', error);
    });
  }

  const submitBio = async () => {
    if(bio.length > 0) {
      try {
        await firebase.firestore().collection('users').doc(uid).set({
          bio
        }, { merge: true })
        Keyboard.dismiss();
        setBio('');
        setRefetchUserInfo(true);
      } catch(e) {
        console.log('failed')
      }
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text>Hello, {userInfo?.first_name} {userInfo?.last_name}</Text>
        <Text>{userInfo?.bio}</Text>
        <TextInput
          style={{ height: 100, width: '80%', borderColor: 'gray', borderWidth: 1 }}
          editable
          multiline
          numberOfLines={4}
          maxLength={40}
          onChangeText={(text) => setBio(text)}
          value={bio}
        />
        <Button onPress={submitBio} title="submit" />
        <Button onPress={signOut} title="sign out" />
      </View>
    </TouchableWithoutFeedback>
  )
}
