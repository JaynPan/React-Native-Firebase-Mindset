import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import * as firebase from 'firebase';

import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyACT5PT5xo1Zv-5VZXym66dpYU5ruoM_jc",
  authDomain: "lohas-cocktail-recipes.firebaseapp.com",
  databaseURL: "https://lohas-cocktail-recipes.firebaseio.com",
  projectId: "lohas-cocktail-recipes",
  storageBucket: "lohas-cocktail-recipes.appspot.com",
  messagingSenderId: "sender-id",
  appId: "app-id",
  measurementId: "G-measurement-id"
};

firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <AppNavigator />
  );
}

const AppSwitchNavigator = createSwitchNavigator({
  DashboardScreen,
  LoadingScreen,
  LoginScreen,
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

