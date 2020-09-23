import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform, TouchableWithoutFeedback, Keyboard,
} from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import * as firebase from 'firebase';

import Input from '../components/TextInput';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#345995',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    color: '#fff',
    fontSize: 25,
  },
  footer: {
    flex: 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
});

export default function SignUpSceen() {
  const [form, setState] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const updateField = (field, val) => {
    setState({ ...form, [field]: val });
  };

  const signUp = async (lastname, firstname, email, password, confirmPassword) => {
    // validate form value
    if (password !== confirmPassword) {
      return;
    }

    try {
      const result = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const { uid } = result.user;

      if (result && !result.emailVerified) {
        const user = await firebase.auth().currentUser;
        await user.sendEmailVerification();
        console.log('email verification sent to user');
      }

      await firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .set({
          firstname,
          lastname,
          email,
          password,
          createdAt: new Date(),
          emailVerified: false,
        });
    } catch (error) {
      const errorMessage = error.message;

      console.log(errorMessage);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar backgroundColor='#345995' barStyle="light-content"/>
      <View style={styles.header}>
        <Text style={styles.logo}>註冊</Text>
      </View>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
      >
        <Animatable.View
          style={[styles.footer]}
          animation="fadeInUpBig"
        >
          <Input
            label="姓氏"
            placeholder='陳'
            leftIcon={<Ionicons name="md-person" size={18} color="#86939e" />}
            inputStyle={{ marginLeft: 10 }}
            keyboardType="email-address"
            value={form.lastname}
            onChangeText={(val) => updateField('lastname', val)}
          />
          <Input
            label="名字"
            placeholder='阿家'
            leftIcon={<Ionicons name="md-person" size={18} color="#86939e" />}
            inputStyle={{ marginLeft: 10 }}
            keyboardType="email-address"
            value={form.firstname}
            onChangeText={(val) => updateField('firstname', val)}
          />
          <Input
            label="電子郵件"
            placeholder='email@gmail.com'
            leftIcon={<Ionicons name="md-mail" size={18} color="#86939e" />}
            inputStyle={{ marginLeft: 10 }}
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(val) => updateField('email', val)}
          />
          <Input
            label="密碼"
            secureTextEntry={true}
            placeholder='Your Password'
            leftIcon={<Ionicons name="md-lock" size={18} color="#86939e" />}
            inputStyle={{ marginLeft: 10 }}
            value={form.password}
            onChangeText={(val) => updateField('password', val)}
          />
          <Input
            label="確認密碼"
            secureTextEntry={true}
            keyboardType="password"
            placeholder='Confirm Password'
            leftIcon={<Ionicons name="md-lock" size={18} color="#86939e" />}
            inputStyle={{ marginLeft: 10 }}
            value={form.confirmPassword}
            onChangeText={(val) => updateField('confirmPassword', val)}
          />
          <Button
            buttonStyle={{ borderRadius: 10 }}
            title="註冊"
            onPress={() => signUp(
              form.lastname,
              form.firstname,
              form.email,
              form.password,
              form.confirmPassword,
            )}
          />
        </Animatable.View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
