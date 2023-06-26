import { useRef, useState } from 'react';
import { Animated, FlatList, Image, View } from 'react-native';
import { WorkoutDetailStore } from '../../stores/workoutDetail.store';
import { GoalStore } from '../../stores/goal.store';
import VideoPlayer from 'react-native-video-player';
import Pagination from '../pagination';

const Slider = ({ store }: { store: WorkoutDetailStore }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);

  const handleOnScroll = event => {
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

  const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
    setIndex(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;
  return (
    <View
      style={{ flex: 0.7 }}
      className='mb-10 mx-5 items-center justify-center'>
      <FlatList
        data={store.downloads}
        renderItem={({ item, index }) => (
          <View className='items-center justify-center'>
            {item.slice(item.lastIndexOf('.')) === '.jpg' ? (
              <Image
                key={index}
                source={{
                  uri: item,
                }}
                style={{ width: 300, height: 300 }}
              />
            ) : (
              <VideoPlayer
                key={index}
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
