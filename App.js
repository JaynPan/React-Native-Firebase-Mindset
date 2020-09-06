import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import './firebaseConfig';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import AuthProvider from './context/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen,
  DashboardScreen,
  LoginScreen,
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

