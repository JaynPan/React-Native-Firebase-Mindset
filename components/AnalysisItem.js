import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import { DARK_BROWN } from '../constant/styles';

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    marginRight: 15,
  },
  iconWrapper: {
    backgroundColor: DARK_BROWN,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  text: {
    color: '#fff',
    fontSize: 10,
  },
});

export default function AnalsyisItem({ category, description }) {
  const selectCategory = () => {
    switch (category) {
      case 'alcohol':
        return <Feather name="droplet" size={16} color="#fff" />;
      case 'glass':
        return <FontAwesome name="glass" size={16} color="#fff" />;
      case 'method':
      default:
        return <MaterialCommunityIcons name="cup" size={16} color="#fff" />;
    }
  };

  return (
    <View style={styles.item}>
      <View style={styles.iconWrapper}>
        {selectCategory()}
      </View>
      <Text style={styles.text}>{description}</Text>
  </View>
  );
}
