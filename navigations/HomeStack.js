import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import RecipeScreen from '../screens/RecipeScreen';

const RootStack = createStackNavigator();

const HomeStack = () => (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen
        name="HomeScreen"
        component={HomeScreen}
      />
      <RootStack.Screen
        name="RecipeScreen"
        component={RecipeScreen}
      />
    </RootStack.Navigator>
);

export default HomeStack;
