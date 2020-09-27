import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigations from './TabNavigations';
import SplashScreen from '../screens/SplashScreen';
import SignInScreen from '../screens/SiginInScreen';
import SignUpScreen from '../screens/SignUpScreen';

const RootStack = createStackNavigator();

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const RootStackScreen = () => (
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
        name="TabNavigations"
        component={TabNavigations}
        options={{
          cardStyleInterpolator: forFade,
          gestureEnabled: false,
        }}
      />
    </RootStack.Navigator>
);

export default RootStackScreen;
