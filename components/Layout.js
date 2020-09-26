import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';

import { DARK_BLACK } from '../constant/styles';

export default function Layout({ children }) {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ backgroundColor: DARK_BLACK }} />
      {children}
    </>
  );
}
