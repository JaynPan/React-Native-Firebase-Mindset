import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from '../screens/HomeScreen';
import Setting from '../screens/SettingScreen';

const Tab = createBottomTabNavigator();

const TAB_NAME = {
  home: 'Home',
  setting: 'Setting',
};

export default function TabNavigations() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/display-name
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === TAB_NAME.home) {
            iconName = 'ios-home';
          } else if (route.name === TAB_NAME.setting) {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        inactiveBackgroundColor: '#1B2021',
        activeBackgroundColor: '#1B2021',
        style: {
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  );
}
