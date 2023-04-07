import React from 'react';
import {View, Text, StyleSheet, Button, TextInput} from 'react-native';
import axios from 'axios';
import {LoggerFactory} from '@fiu-fit/common';

export const SignUpScreen = () => {
  const logger = LoggerFactory('signUpScreen');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:8080/auth/register', {
        firstName,
        lastName,
        email,
        password,
        role: 1,
      });
      logger.info(response.data);
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Create Account Screen</Text>
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
