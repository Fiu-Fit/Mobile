import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import COLORS from '../../constants/colors';
import { BarChartProps } from '../../utils/custom-types';

const { width } = Dimensions.get('screen');
const Pagination = ({
  data,
  scrollX,
  index,
}: {
  data: string[] | BarChartProps[];
  scrollX: Animated.Value;
  index: number;
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
        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: ['#ccc', COLORS.blue, '#ccc'],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={idx.toString()}
            style={[styles.dot, { width: dotWidth, backgroundColor }]}
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
  dotActive: {
    backgroundColor: COLORS.blue,
  },
});
