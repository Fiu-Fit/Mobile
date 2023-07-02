import { useRef, useState } from 'react';
import { Animated, FlatList, View, ViewToken } from 'react-native';
import Pagination from '../pagination';
import { BarChartProps } from '../../utils/custom-types';
import BarChart from '../barChart';
import { Text } from 'react-native-paper';
import GroupedBarChart from '../groupedBarChart';
import { Bar } from 'victory-native';
import { observer } from 'mobx-react';

type ChartSliderProps = {
  favoritesData: BarChartProps;
  averageRatingsData: BarChartProps;
  ratingsData: BarChartProps[];
};

const ChartSlider = ({
  favoritesData,
  averageRatingsData,
  ratingsData,
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
        data={[favoritesData, averageRatingsData, ratingsData]}
        renderItem={({ item, index: i }) => (
          <View key={`view-list-${i}`} className='items-center justify-center'>
            {i === 0 && (
              <Text key={`favorite-chart-text-${i}`}>
                Cantidad de favoritos
              </Text>
            )}
            {i === 1 && (
              <Text key={`avg-rating-chart-text-${i}`}>Rating promedio</Text>
            )}
            {i === 2 && (
              <Text key={`rating-chart-text-${i}`}>Puntuaciones</Text>
            )}

            {i !== 2 ? (
              <BarChart key={`bar-chart-${i}`} data={item as BarChartProps} />
            ) : (
              <GroupedBarChart
                key={`grouped-bar-chart-${i}`}
                data={item as BarChartProps[]}
              />
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
        data={[favoritesData, averageRatingsData, ratingsData]}
        scrollX={scrollX}
        index={index}
      />
    </View>
  );
};

export default observer(ChartSlider);
