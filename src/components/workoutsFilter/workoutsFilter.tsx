import { useAppTheme } from '../../App';
import { View } from 'react-native';
import WorkoutFilter from '../workoutFilter';
import { useState } from 'react';
import WorkoutFilterModal from '../workoutFilterModal';
import {
  categoryMap,
  difficultyMap,
  workoutCategoryOptions,
  workoutDifficultyOptions,
} from '../../utils/workout-types';
import { workoutStore } from '../../stores/workout.store';

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
          onSelect={(filter: number | undefined) => {
            workoutStore.selectedTypeFilter = filter;
            workoutStore.fetchWorkouts();
          }}
          items={workoutCategoryOptions}
          keyPrefix='workouts-category'
        />
      )}
      {workoutDifficultyFilterModalVisible && (
        <WorkoutFilterModal
          onDismiss={() => setWorkoutDifficultyFilterModalVisible(false)}
          onSelect={(filter: number | undefined) => {
            workoutStore.selectedDifficultyFilter = filter;
            workoutStore.fetchWorkouts();
          }}
          items={workoutDifficultyOptions}
          keyPrefix='workouts-difficulty'
        />
      )}
      <WorkoutFilter
        iconName='dumbbell'
        text='Tipo de entrenamiento'
        selectedFilter={
          categoryMap.get(workoutStore.selectedTypeFilter ?? -1) ||
          'Desconocido'
        }
        onPress={() => setWorkoutTypeFilterModalVisible(true)}
      />
      <WorkoutFilter
        iconName='star'
        text='Tipo de dificultad'
        selectedFilter={
          difficultyMap.get(workoutStore.selectedDifficultyFilter ?? -1) ||
          'Desconocido'
        }
        onPress={() => setWorkoutDifficultyFilterModalVisible(true)}
      />
    </View>
  );
};

export default WorkoutsFilter;
