import { useRef, useState } from 'react';
import { Animated, FlatList, View, ViewToken } from 'react-native';
import Pagination from '../pagination';
import { BarChartProps } from '../../utils/custom-types';
import BarChart from '../barChart';
import { Text } from 'react-native-paper';
import GroupedBarChart from '../groupedBarChart';
import { Bar } from 'victory-native';

type ChartSliderProps = {
  favoriteData: BarChartProps;
  ratingData: BarChartProps;
  ratings: BarChartProps[];
};

const ChartSlider = ({
  favoriteData,
  ratingData,
  ratings,
}: ChartSliderProps) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);

  const handleOnScroll = (event: any) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems && viewableItems.length > 0 && viewableItems[0]) {
        setIndex(viewableItems[0].index ?? 0);
      }
    },
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View style={{ flex: 1 }} className='mb-10 items-center justify-center'>
      <FlatList
        data={[favoriteData, ratingData, ratings]}
        renderItem={({ item, index: i }) => (
          <View className='items-center justify-center'>
            {i === 0 && <Text>Cantidad de favoritos</Text>}
            {i === 1 && <Text>Rating promedio</Text>}
            {i === 2 && <Text>Puntuaciones</Text>}

            {i !== 2 ? (
              <BarChart data={item as BarChartProps} />
            ) : (
              <GroupedBarChart data={item as BarChartProps[]} />
            )}
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToAlignment='center'
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination
        data={[favoriteData, ratingData, ratingData]}
        scrollX={scrollX}
        index={index}
      />
    </View>
  );
};

export default ChartSlider;
