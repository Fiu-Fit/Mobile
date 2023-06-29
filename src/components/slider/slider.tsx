import { useRef, useState } from 'react';
import { Animated, FlatList, Image, View, ViewToken } from 'react-native';
import { WorkoutDetailStore } from '../../stores/workoutDetail.store';
import { GoalStore } from '../../stores/goal.store';
import VideoPlayer from 'react-native-video-player';
import Pagination from '../pagination';

const Slider = ({ store }: { store: WorkoutDetailStore | GoalStore }) => {
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
    <View
      style={{ flex: 0.7 }}
      className='mb-10 mx-5 items-center justify-center'>
      <FlatList
        data={store.downloads}
        renderItem={({ item, index: i }) => (
          <View className='items-center justify-center'>
            {item.slice(item.lastIndexOf('.')) === '.jpg' ? (
              <Image
                key={i}
                source={{
                  uri: item,
                }}
                style={{ width: 300, height: 300 }}
              />
            ) : (
              <VideoPlayer
                key={i}
                video={{
                  uri: item,
                }}
                videoWidth={400}
                videoHeight={450}
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
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                height: '100%',
                width: 100,
              }}
            />
          );
        }}
      />
      <Pagination data={store.downloads} scrollX={scrollX} index={index} />
    </View>
  );
};

export default Slider;
