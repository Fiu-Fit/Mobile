import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import React from 'react';

const { width } = Dimensions.get('screen')
const Pagination = ({
  data,
  scrollX,
}: {
  data: string[];
  scrollX: Animated.Value;
}) => {
  return (
    <View style={styles.container}>
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [12, 30, 12],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={idx.toString()}
            style={[styles.dot, { width: dotWidth }]}
          />
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    marginTop: 15,
    width: 10,
    height: 10,
    borderRadius: 6,
    marginHorizontal: 3,
    backgroundColor: '#ccc',
  },
});
