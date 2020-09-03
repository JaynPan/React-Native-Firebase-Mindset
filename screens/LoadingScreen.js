import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" />
    </View>
  )
}

