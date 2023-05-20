import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme, useUserContext } from '../../App';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../constants/colors';
import { WorkoutDetailStore } from '../../stores/workoutDetail.store';

type WorkoutHeaderProps = {
  workoutDetailStore: WorkoutDetailStore;
};

const WorkoutHeader = ({ workoutDetailStore }: WorkoutHeaderProps) => {
  const appTheme = useAppTheme();
  const { currentUser } = useUserContext();
  const workoutHeader = workoutDetailStore.workoutHeader;
  return (
    <View
      className='items-center justify-center'
      style={{ backgroundColor: appTheme.colors.background, flex: 0.2 }}>
      <View
        className='flex-row items-around justify-around mt-10'
        style={{ width: '50%' }}>
        <Text
          className='text-4xl'
          style={{ color: appTheme.colors.onBackground }}>
          {workoutHeader.name}
        </Text>
        <TouchableOpacity
          className='justify-center items-center'
          onPress={() =>
            workoutDetailStore.addWorkoutAsFavourite(currentUser.id)
          }>
          <Icon
            style={{
              fontSize: 35,
              color: appTheme.colors.onSurface,
            }}
            name={'star'}
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

export default WorkoutHeader;
