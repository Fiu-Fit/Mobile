import { useAppTheme } from '../../App';
import { View } from 'react-native';
import WorkoutFilter from '../workoutFilter';
import { useState } from 'react';
import WorkoutFilterModal from '../workoutFilterModal';
import {
  workoutCategoryOptions,
  workoutDifficultyOptions,
} from '../../utils/workout-types';

const WorkoutsFilter = () => {
  const appTheme = useAppTheme();
  const [workoutTypeFilterModalVisible, setWorkoutTypeFilterModalVisible] =
    useState(false);
  const [
    workoutDifficultyFilterModalVisible,
    setWorkoutDifficultyFilterModalVisible,
  ] = useState(false);

  return (
    <View
      className='justify-center items-center'
      style={{ flex: 0.15, backgroundColor: appTheme.colors.scrim }}>
      {workoutTypeFilterModalVisible && (
        <WorkoutFilterModal
          onDismiss={() => setWorkoutTypeFilterModalVisible(false)}
          items={workoutCategoryOptions}
        />
      )}
      {workoutDifficultyFilterModalVisible && (
        <WorkoutFilterModal
          onDismiss={() => setWorkoutDifficultyFilterModalVisible(false)}
          items={workoutDifficultyOptions}
        />
      )}
      <WorkoutFilter
        iconName='dumbbell'
        text='Tipo de entrenamiento'
        onPress={() => setWorkoutTypeFilterModalVisible(true)}
      />
      <WorkoutFilter
        iconName='star'
        text='Tipo de dificultad'
        onPress={() => setWorkoutDifficultyFilterModalVisible(true)}
      />
    </View>
  );
};

export default WorkoutsFilter;
