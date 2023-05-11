import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '../../App';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type WorkoutInfoProps = {
  duration: number;
  exerciseCount: number;
  globalRating: number;
  onPressModal: () => void;
};

const WorkoutInfo = ({
  duration,
  exerciseCount,
  globalRating,
  onPressModal,
}: WorkoutInfoProps) => {
  const appTheme = useAppTheme();
  return (
    <View
      className='flex-row items-center justify-between'
      style={{ backgroundColor: appTheme.colors.surfaceVariant, flex: 0.08 }}>
      <Text
        className='text-lg ml-5'
        style={{ color: appTheme.colors.onBackground }}>
        {duration} min - {exerciseCount} ejercicios
      </Text>
      <View className='flex-row justify-center'>
        <TouchableOpacity
          className='flex-row justify-center'
          onPress={onPressModal}>
          <Text className='text-xl'>4 {globalRating}</Text>
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
      </View>
    </View>
  );
};

export default WorkoutInfo;
