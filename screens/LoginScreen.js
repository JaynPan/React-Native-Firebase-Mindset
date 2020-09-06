import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import * as firebase from 'firebase';
import * as Google from 'expo-google-app-auth';
import { IOS_CLIENT_ID } from 'react-native-dotenv'

import { useAuth } from '../context/AuthProvider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default function LoginScreen() {
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

  const onSignIn = (googleUser) => {
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
        onSignIn(result)
      } else {
        return { cancelled: true };
      }
    } catch(e) {
      console.log(e.response)
    }
  }

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button onPress={signInWithGoogleAsync} title="Create New" />
    </View>
  )
}
