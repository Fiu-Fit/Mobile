import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '../../App';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { IWorkoutHeader } from '../../utils/workout-types';
import { workoutDetailStore } from '../../stores/workoutDetail.store';
import LoggerFactory from '../../utils/logger-utility';
import { observer } from 'mobx-react';

const logger = LoggerFactory('workout-info');

type WorkoutInfoProps = {
  workoutHeader: IWorkoutHeader;
  onPressRatingModal: () => void;
  onPressMultimediaModal: () => void;
};

const WorkoutInfo = ({
  workoutHeader,
  onPressRatingModal,
  onPressMultimediaModal,
}: WorkoutInfoProps) => {
  const appTheme = useAppTheme();
  return (
    <View
      className='flex-row items-center justify-between'
      style={{ backgroundColor: appTheme.colors.surfaceVariant, flex: 0.08 }}>
      <Text
        className='text-lg ml-5'
        style={{ color: appTheme.colors.onBackground }}>
        {workoutHeader.duration} min - {workoutHeader.exerciseCount} ejercicios
      </Text>
      <View className='flex-row justify-center'>
        <TouchableOpacity
          className='flex-row justify-center'
          onPress={onPressRatingModal}>
          <Text className='text-xl'>{workoutHeader.averageRating}</Text>
          <Icon
            style={{
              fontSize: 30,
              color: appTheme.colors.onSurface,
              marginRight: 30,
              marginLeft: 5,
            }}
            name={'star'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          className='flex-row justify-center'
          onPress={() => {
            logger.debug('downloads: ', workoutDetailStore.downloads);
            onPressMultimediaModal();
          }}>
          <Icon
            style={{
              fontSize: 30,
              color: appTheme.colors.onSurface,
              marginRight: 30,
              marginLeft: 5,
            }}
            name={'attachment'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default observer(WorkoutInfo);
