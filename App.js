import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import './firebaseConfig';

import RootStackScreen from './navigations/RootStack';
import AuthProvider from './context/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </AuthProvider>
  );
}
