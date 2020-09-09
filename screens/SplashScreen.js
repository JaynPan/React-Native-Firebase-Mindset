import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function SplashScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Splash</Text>
    </View>
  )
}