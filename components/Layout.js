import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';

import { DARK_BLACK } from '../constant/styles';

export default function Layout({ children, shouldSafeArea = true }) {
  return (
    <>
      <StatusBar barStyle="light-content" />
      {shouldSafeArea && <SafeAreaView style={{ backgroundColor: DARK_BLACK }} />}
      {children}
    </>
  );
}
