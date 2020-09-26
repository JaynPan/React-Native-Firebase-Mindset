import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Layout from '../components/Layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function SettingScreen() {
  return (
    <Layout>
      <View style={styles.container}>
        <Text>Recipe</Text>
      </View>
    </Layout>
  );
}
