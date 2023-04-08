import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import LoggerFactory from '../../utils/logger-utility';

const logger = LoggerFactory('sign_in');

export const SignInScreen = () => {
  logger.info('Started Sign in screen!');
  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <Button title="Sign In" onPress={() => logger.warning('todo!')} />
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
