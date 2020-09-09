import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function SignInScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>sign in</Text>
    </View>
  )
}