import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Input } from 'react-native-elements'

const styles = StyleSheet.create({
  input: {
    fontSize: 12,
  }
})

export default function TextInput ({ ...rest }) {
  return (
    <Input
      style={styles.input}
      labelStyle={{
        fontSize: 11
      }}
      inputContainerStyle={{
        height: 30,
      }}
      {...rest}
      keyboardAppearance="dark"
    />
  )
}