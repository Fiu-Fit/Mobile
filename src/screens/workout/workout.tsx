import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme, useUserContext } from '../../App';
import { WorkoutScreenNavigationProp } from '../../navigation/navigation-props';
import React, { useCallback } from 'react';
import WorkoutRatingModal from '../../components/workoutRatingModal';
import { observer } from 'mobx-react';
import Loader from '../../components/loader';
import { action, runInAction } from 'mobx';
import WorkoutHeader from '../../components/workoutHeader';
import WorkoutInfo from '../../components/workoutInfo';
import ItemCardList from '../../components/itemCardList';
import ExerciseModal from '../../components/exerciseModal';
import { ExerciseCardInfo } from '../../utils/workout-types';
import { workoutDetailStore } from '../../stores/workoutDetail.store';
import FloatingActionButton from '../../components/dumb/floatingActionButton';
import { Role } from '../../constants/roles';
import WorkoutCompletedModal from '../../components/workoutCompletedModal';
import { useFocusEffect } from '@react-navigation/native';
import MultimediaModal from '../../components/multimediaModal';
import Button from '../../components/button';

type WorkoutScreenProps = {
  navigation: WorkoutScreenNavigationProp;
  route: {
    params: {
      itemId: string;
    };
  };
};

const WorkoutScreen = ({ navigation, route }: WorkoutScreenProps) => {
  const appTheme = useAppTheme();
  const { currentUser } = useUserContext();
  const [selectedExercise, setSelectedExercise] = React.useState<
    ExerciseCardInfo | undefined
  >(undefined);
  const [ratingModalVisible, setRatingModalVisible] = React.useState(false);
  const [completedWorkoutModalVisible, setCompletedWorkoutModalVisible] =
    React.useState(false);
  const [multimediaModalVisible, setMultimediaModalVisible] =
    React.useState(false);
  const { itemId } = route.params;

  useFocusEffect(
    useCallback(() => {
      runInAction(() => {
        workoutDetailStore.fetchWorkout(itemId);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const handleCompletedWorkout = () => {
    workoutDetailStore.completeWorkout(currentUser.id);
    setCompletedWorkoutModalVisible(true);
  };

  return workoutDetailStore.state === 'pending' ? (
    <Loader />
  ) : (
    <View
      className='flex-1'
      style={{ backgroundColor: appTheme.colors.background }}>
      <WorkoutHeader />
      <WorkoutInfo
        workoutHeader={workoutDetailStore.workoutHeader}
        onPressRatingModal={() => setRatingModalVisible(true)}
        onPressMultimediaModal={() => setMultimediaModalVisible(true)}
      />
      <View
        className='mt-5'
        style={{
          backgroundColor: appTheme.colors.background,
          flex: 0.62,
        }}>
        {ratingModalVisible && (
          <WorkoutRatingModal onDismiss={() => setRatingModalVisible(false)} />
        )}

        <ItemCardList
          keyPrefix='workout-exercise-cards'
          items={workoutDetailStore.exerciseCards}
          onPress={item => setSelectedExercise(item)}
        />

        {selectedExercise && (
          <ExerciseModal
            onDismiss={() => setSelectedExercise(undefined)}
            exerciseItem={selectedExercise}
          />
        )}

        {completedWorkoutModalVisible && (
          <WorkoutCompletedModal
            onDismiss={() => {
              setCompletedWorkoutModalVisible(false);
              navigation.goBack();
            }}
            workoutItem={workoutDetailStore.workout}
          />
        )}

        {multimediaModalVisible && (
          <MultimediaModal
            onDismiss={() => {
              setMultimediaModalVisible(false);
            }}
            store={workoutDetailStore}
          />
        )}
      </View>
      {currentUser.role !== Role.Athlete &&
        currentUser.id === workoutDetailStore.workout.authorId && (
          <View>
            <FloatingActionButton
              onPress={() => navigation.push('UpsertWorkoutScreen', { itemId })}
              icon='pencil'
            />
            <FloatingActionButton
              onPress={() => navigation.push('WorkoutMetricsScreen')}
              icon='chart-bar'
              right={320}
            />
          </View>
        )}

      <View style={{ flex: 0.1, marginHorizontal: 130, marginTop: 30 }}>
        <Button title='Completar' onPress={() => handleCompletedWorkout()} />
      </View>
    </View>
  );
};

export default observer(WorkoutScreen);
