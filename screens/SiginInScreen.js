import React from 'react';
import { StyleSheet, View, Text, StatusBar, Button, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as firebase from 'firebase';
import * as Google from 'expo-google-app-auth';
import { IOS_CLIENT_ID } from 'react-native-dotenv'
import { SocialIcon } from 'react-native-elements'

import { useAuth } from '../context/AuthProvider';

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
    fontSize: 25
  },
  footer: {
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
});

export default function SplashScreen({ navigation }) {
  const { setUid } = useAuth();

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

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#345995' barStyle="light-content"/>
      <View style={styles.header}>
        <Text style={styles.logo}>登入</Text>
      </View>
      <Animatable.View 
        style={[styles.footer]}
        animation="fadeInUpBig"
      >
        <SocialIcon
          title="Sign In With Google"
          button={true}
          type="google"
          onPress={signInWithGoogleAsync}
        />
      </Animatable.View>
    </View>
  )
}