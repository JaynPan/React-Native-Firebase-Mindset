import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import './firebaseConfig';

import RootStackScreen from './navigations/RootStack';
import AuthProvider from './context/AuthProvider';
import RecipeProvider from './context/RecipeProvider';

export default function App() {
  return (
    <AuthProvider>
      <RecipeProvider>
        <NavigationContainer>
          <RootStackScreen />
        </NavigationContainer>
      </RecipeProvider>
    </AuthProvider>
  );
}
