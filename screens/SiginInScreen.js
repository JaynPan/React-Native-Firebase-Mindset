import React, { useState } from 'react';
import { StyleSheet, View, Text, StatusBar, Button as RNBtn, KeyboardAvoidingView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as firebase from 'firebase';
import * as Google from 'expo-google-app-auth';
import { IOS_CLIENT_ID } from 'react-native-dotenv'
import { SocialIcon, Button } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'; 

import { useAuth } from '../context/AuthProvider';
import Input from '../components/TextInput';

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#345995'
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    color: '#fff',
    fontSize: 18
  },
  footer: {
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  or: {
    color: '#86939e',
    textAlign: 'center',
    marginVertical: 20,
  },
  others: {
    borderTopWidth: 1,
    borderColor: '#eee',
    marginTop: 20,
    paddingTop: 10,
  }
});

export default function SplashScreen({ navigation }) {
  const { setUid } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isUserEqual = (googleUser, firebaseUser) => {
    console.log('firebaseuser', firebaseUser);
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  const onSignInGoogle = (googleUser) => {
    // console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        )
        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInWithCredential(credential)
          .then((result) => {
            console.log('sign in success');

            const uid = result.user.uid;

            if(result.additionalUserInfo.isNewUser) {
              firebase
                .firestore()
                .collection("users")
                .doc(uid)
                .set({
                  gmail: result.user.email,
                  profile_picture: result.additionalUserInfo.profile.picture,
                  locale: result.additionalUserInfo.profile.locale,
                  first_name: result.additionalUserInfo.profile.given_name,
                  last_name: result.additionalUserInfo.profile.family_name,
                  created_at: Date.now() 
                })
            }

            setUid(uid)
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(errorMessage)
            // ...
          });
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  }

  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        bahavior: 'web',
        iosClientId: IOS_CLIENT_ID,
        scope: ['profile', 'email']
      });

      if(result.type === 'success') {
        onSignInGoogle(result)
      } else {
        return { cancelled: true };
      }
    } catch(e) {
      console.log(e.response)
    }
  }

  const signIn = async (email, password) => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)

    } catch(error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log('signIn error', errorMessage)
    }
  }

  return (
    <KeyboardAvoidingView 
      behavior="padding"
      style={styles.container}
    >
      <StatusBar backgroundColor='#345995' barStyle="light-content"/>
      <View style={styles.header}>
        <Text style={styles.logo}>登入</Text>
      </View>
      <Animatable.View
        style={[styles.footer]}
        animation="fadeInUpBig"
      >
        <Input
          label="輸入電子郵件"
          placeholder='email@gmail.com'
          leftIcon={<Ionicons name="md-mail" size={24} color="#86939e" />}
          inputStyle={{ marginLeft: 10 }}
          keyboardType="email-address"
          value={email}
          onChangeText={val => setEmail(val)}
        />
        <Input
          label="輸入密碼"
          secureTextEntry={true}
          autoCompleteType="password"
          placeholder='Password'
          leftIcon={<Ionicons name="md-lock" size={24} color="#86939e" />}
          inputStyle={{ marginLeft: 10 }}
          value={password}
          onChangeText={val => setPassword(val)}
        />
        <Button
          buttonStyle={{borderRadius: 10}}
          title="登入"
          onPress={() => signIn(email, password)}
        />
        <Text style={styles.or}>或者</Text>
        <SocialIcon
          title="使用 Google 登入"
          button={true}
          type="google"
          onPress={signInWithGoogleAsync}
          style={{width: '100%', marginHorizontal: 'auto', borderRadius: 10}}
        />
        <View style={styles.others}>
          <RNBtn title="註冊帳號" onPress={() => navigation.navigate('SignUpScreen')} />
        </View>
      </Animatable.View>
    </KeyboardAvoidingView>
  )
}