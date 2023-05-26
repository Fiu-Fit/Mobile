import { TouchableOpacity, View } from 'react-native';
import { useAppTheme, useUserContext } from '../../App';
import { Text } from 'react-native-paper';
import { WorkoutStore } from '../../stores/workout.store';
import { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { action } from 'mobx';

interface WorkoutSelectorProps {
  workoutStore: WorkoutStore;
}

const WorkoutsSelector = ({ workoutStore }: WorkoutSelectorProps) => {
  const appTheme = useAppTheme();
  const { currentUser } = useUserContext();
  const [showingAllWorkouts, setShowingAllWorkouts] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      action(() => {
        onChangeShowingAllWorkouts(showingAllWorkouts);
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const onChangeShowingAllWorkouts = (isShowingAllWorkouts: boolean) => {
    if (isShowingAllWorkouts) {
      workoutStore.fetchWorkouts();
    } else {
      workoutStore.fetchRecommendedWorkouts(currentUser.interests);
    }
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
