import { TouchableOpacity, View } from 'react-native';
import { useAppTheme } from '../../App';
import { Text } from 'react-native-paper';
import { WorkoutStore } from '../../stores/workout.store';
import { useState } from 'react';

interface WorkoutSelectorProps {
  workoutStore: WorkoutStore;
}

const WorkoutsSelector = ({ workoutStore }: WorkoutSelectorProps) => {
  const appTheme = useAppTheme();
  const [showingAllWorkouts, setShowingAllWorkouts] = useState(false);

  const onChangeShowingAllWorkouts = (isShowingAllWorkouts: boolean) => {
    workoutStore.fetchWorkouts();
    setShowingAllWorkouts(isShowingAllWorkouts);
  };
  return (
    <View
      className='flex-row justify-center items-center'
      style={{ flex: 0.1, backgroundColor: appTheme.colors.scrim }}>
      <TouchableOpacity
        className='justify-center items-center h-full'
        style={{
          flex: 0.5,
          borderBottomWidth: 2,
          borderBottomColor: showingAllWorkouts
            ? 'transparent'
            : appTheme.colors.primary,
        }}
        onPress={() => onChangeShowingAllWorkouts(false)}>
        <Text>Recomendados</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className='justify-center items-center h-full'
        style={{
          flex: 0.5,
          borderBottomWidth: 2,
          borderBottomColor: showingAllWorkouts
            ? appTheme.colors.primary
            : 'transparent',
        }}
        onPress={() => onChangeShowingAllWorkouts(true)}>
        <Text>Todos</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WorkoutsSelector;
