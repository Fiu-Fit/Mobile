import React from 'react';
import {
  View,
  useWindowDimensions,
  ActivityIndicator,
  Text,
} from 'react-native';
import COLORS from '../../constants/colors';
import { useAppTheme } from '../../App';

const Loader = () => {
  const { height, width } = useWindowDimensions();
  const appTheme = useAppTheme();
  return (
    <View
      style={{
        height,
        width,
        backgroundColor: appTheme.colors.background,
        opacity: 0.9,
      }}
      className='justify-center bg-black absolute'>
      <ActivityIndicator
        size='large'
        color={appTheme.colors.onBackground}
        style={{
          marginTop: 400,
          marginLeft: 200,
          position: 'absolute',
        }}
      />
    </View>
  );
};

export default Loader;
