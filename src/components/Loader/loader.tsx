import React from 'react';
import {View, useWindowDimensions, ActivityIndicator, Text} from 'react-native';
import COLORS from '../../constants/colors';
import {styles} from './styles';

const Loader = () => {
  const {height, width} = useWindowDimensions();
  return (
    <View style={[styles.container, {height, width}]}>
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={COLORS.blue} />
        <Text style={styles.text}>Loading...</Text>
      </View>
    </View>
  );
};

export default Loader;
