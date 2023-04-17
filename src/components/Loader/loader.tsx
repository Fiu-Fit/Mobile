import React from 'react';
import {View, useWindowDimensions, ActivityIndicator, Text} from 'react-native';
import COLORS from '../../constants/colors';

const Loader = () => {
  const {height, width} = useWindowDimensions();
  return (
    <View
      style={{height, width}}
      className="justify-center bg-black/50 absolute">
      <View className="h-70, bg-black mx-50 flex-row justify-start items-center px-20 round-sm">
        <ActivityIndicator size="large" color={COLORS.blue} />
        <Text className="ml-10 text-xl">Loading...</Text>
      </View>
    </View>
  );
};

export default Loader;
