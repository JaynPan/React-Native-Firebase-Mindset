import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeStack from './HomeStack';
import Setting from '../screens/SettingScreen';
import { DARK_BLACK, DARK_BROWN } from '../constant/styles';

const Tab = createBottomTabNavigator();

const TAB_NAME = {
  home: '首頁',
  setting: '設定',
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
        activeTintColor: DARK_BROWN,
        inactiveBackgroundColor: DARK_BLACK,
        activeBackgroundColor: DARK_BLACK,
        style: {
          backgroundColor: DARK_BLACK,
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen name={TAB_NAME.home} component={HomeStack} />
      <Tab.Screen name={TAB_NAME.setting} component={Setting} />
    </Tab.Navigator>
  );
}
