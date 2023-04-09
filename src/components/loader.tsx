import React from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
  Text,
} from 'react-native';
import COLORS from '../constants/colors';

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

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  loader: {
    height: 70,
    backgroundColor: COLORS.black,
    marginHorizontal: 50,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
  },
});
