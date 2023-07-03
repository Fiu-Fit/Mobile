import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme, useUserContext } from '../../App';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../constants/colors';
import { workoutDetailStore } from '../../stores/workoutDetail.store';
import { workoutStore } from '../../stores/workout.store';
import { observer } from 'mobx-react';
import { useState } from 'react';
import Loader from '../loader';
import { runInAction } from 'mobx';
import LoggerFactory from '../../utils/logger-utility';

const logger = LoggerFactory('workout-header');

const WorkoutHeader = () => {
  const appTheme = useAppTheme();
  const { currentUser } = useUserContext();
  const workoutHeader = workoutDetailStore.workoutHeader;
  const [loading, setLoading] = useState(false);

  const handleFavouriteWorkout = () => {
    setLoading(true);
    try {
      if (
        workoutStore.favoriteWorkouts.some(
          workout => workout._id === workoutDetailStore.workout._id,
        )
      ) {
        runInAction(() => {
          workoutDetailStore.removeWorkoutAsFavourite(currentUser.id);
        });
      } else {
        runInAction(() => {
          workoutDetailStore.addWorkoutAsFavourite(currentUser.id);
        });
      }
    } catch (error) {
      logger.error(error as string);
    }
    setLoading(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <View
      className='items-center justify-center'
      style={{ backgroundColor: appTheme.colors.background, flex: 0.2 }}>
      <View
        className='flex-row items-around justify-around mt-10'
        style={{ width: '100%' }}>
        <Text
          className='text-4xl'
          style={{ color: appTheme.colors.onBackground }}>
          {workoutHeader.name}
        </Text>
        <TouchableOpacity
          className='justify-center items-center'
          onPress={() => handleFavouriteWorkout()}>
          <Icon
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              fontSize: 35,
              color: workoutStore.favoriteWorkouts.some(
                workout => workout._id === workoutDetailStore.workout._id,
              )
                ? 'red'
                : appTheme.colors.onSurface,
            }}
            name={'heart'}
          />
        </TouchableOpacity>
      </View>

      <View className='flex-row justify-around items-center flex-1 mr-10'>
        <View className='items-center justify-center' style={{ flex: 0.7 }}>
          <Text
            className='text-lg'
            style={{ color: appTheme.colors.onSurfaceVariant, flex: 0.5 }}>
            {workoutHeader.description}
          </Text>
        </View>

        <TouchableOpacity
          className='justify-center items-center flex-row'
          style={{ flex: 0.3 }}>
          <Icon
            style={{ fontSize: 22, color: COLORS.blue, marginRight: 5 }}
            name='account-outline'
          />
          <Text className='text-lg' style={{ color: COLORS.blue }}>
            {workoutHeader.author}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default observer(WorkoutHeader);
