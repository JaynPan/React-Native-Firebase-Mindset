import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../screens/SplashScreen';
import SignInScreen from '../screens/SiginInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';

const RootStack = createStackNavigator();

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const RootStackScreen = () => {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen 
        name="SplashScreen"
        component={SplashScreen}
        options={{ cardStyleInterpolator: forFade }}
      />
      <RootStack.Screen 
        name="SignInScreen" 
        component={SignInScreen} 
        options={{ cardStyleInterpolator: forFade }}
      />
      <RootStack.Screen 
        name="SignUpScreen" 
        component={SignUpScreen} 
        options={{ cardStyleInterpolator: forFade }}
      />
      <RootStack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ cardStyleInterpolator: forFade }}
      />
    </RootStack.Navigator>
  )
}

export default RootStackScreen;