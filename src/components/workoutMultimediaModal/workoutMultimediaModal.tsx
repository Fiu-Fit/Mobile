import { Text, View, Image, FlatList, Animated } from 'react-native';
import { useAppTheme } from '../../App';
import { Modal, Portal } from 'react-native-paper';
import { observer } from 'mobx-react';
import { workoutDetailStore } from '../../stores/workoutDetail.store';
import VideoPlayer from 'react-native-video-player';
import Pagination from '../pagination';
import { useRef, useState } from 'react';

type ModalProps = {
  onDismiss: () => void;
};

const WorkoutMultimediaModal = ({ onDismiss }: ModalProps) => {
  const appTheme = useAppTheme();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);

  const containerStyle = {
    backgroundColor: appTheme.colors.surface,
    marginHorizontal: '5%',
    width: '90%',
    height: '60%',
    borderRadius: 20,
  };

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
    <Portal>
      <Modal
        visible={true}
        onDismiss={onDismiss}
        contentContainerStyle={containerStyle}>
        <View className='items-center justify-center' style={{ flex: 1 }}>
          <Text className='text-xl mt-4' style={{ flex: 0.3 }}>
            Contenido Multimedia
          </Text>
          <View
            style={{ flex: 0.7 }}
            className='mb-10 mx-5 items-center justify-center'>
            <FlatList
              data={workoutDetailStore.downloads}
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
            <Pagination
              data={workoutDetailStore.downloads}
              scrollX={scrollX}
              index={index}
            />
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default observer(WorkoutMultimediaModal);
