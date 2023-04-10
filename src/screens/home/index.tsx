import React from 'react';
import {View, Text, Button} from 'react-native';
import {styles} from './styles';

const HomeScreen = ({navigation}: {navigation: any}) => (
  <View style={styles.container}>
    <View style={styles.homeItem}>
      <Text style={styles.textStyle}>HOME</Text>
    </View>
    <View style={styles.homeItem}>
      <Button title="Sign In" onPress={() => navigation.push('SignIn')} />
    </View>
    <View style={styles.homeItem}>
      <Button
        title="Create Account"
        onPress={() => navigation.push('SignUp')}
      />
    </View>
  </View>
);

export default HomeScreen;
