import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import './firebaseConfig';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';


export default function App() {
  return (
    <AppNavigator />
  );
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen,
  DashboardScreen,
  LoginScreen,
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

