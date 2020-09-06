import React, { useEffect } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function LoadingScreen({ navigation }) {
  const checkIfLoggin = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        navigation.navigate('DashboardScreen')
      } else {
        navigation.navigate('LoginScreen')
      }
    })
  }

  useEffect(() => { checkIfLoggin(); }, [])

  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" />
    </View>
  )
}

