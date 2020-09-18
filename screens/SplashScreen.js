import React, { useEffect } from 'react';
import { StyleSheet, View, Text, StatusBar, Button } from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as firebase from 'firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#345995'
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    color: '#fff',
    fontSize: 25
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
});

export default function SplashScreen({ navigation }) {
  const checkIfLoggin = () => {
    firebase.auth().onAuthStateChanged(async (result) => {
      if(result && result?.emailVerified) {        
        // check if user first time login
        if(!result.lastLoginAt) {
          // update email verified status in database
          await firebase
                  .firestore()
                  .collection('users')
                  .doc(result.uid)
                  .set({ emailVerified: true }, { merge: true });
        }

        navigation.navigate('HomeScreen')
      } else {
        navigation.navigate('SignInScreen')
      }
    })
  }

  useEffect(() => { checkIfLoggin(); }, [])

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#345995' barStyle="light-content"/>
      <View style={styles.header}>
        <Text style={styles.logo}>LOHAS Recipes</Text>
      </View>
      <Animatable.View 
        duration={1500}
        style={[styles.footer]}
        animation="fadeInUpBig"
      >
          <Text>歡迎來到調酒世界</Text>
          <Button onPress={() => navigation.navigate('SignInScreen')} title="開始旅程" />
      </Animatable.View>
    </View>
  )
}