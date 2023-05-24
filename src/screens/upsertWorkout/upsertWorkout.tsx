import { View } from 'react-native';
import { useAppTheme, useUserContext } from '../../App';
import { WorkoutScreenNavigationProp } from '../../navigation/navigation-props';
import React, { useEffect } from 'react';
import WorkoutRatingModal from '../../components/workoutRatingModal';
import { observer } from 'mobx-react';
import Loader from '../../components/loader';
import { flowResult } from 'mobx';
import WorkoutHeader from '../../components/workoutHeader';
import WorkoutInfo from '../../components/workoutInfo';
import Button from '../../components/button';
import ItemCardList from '../../components/itemCardList';
import ExerciseModal from '../../components/exerciseModal';
import { ExerciseCardInfo } from '../../utils/workout-types';
import { workoutDetailStore } from '../../stores/workoutDetail.store';
import LoggerFactory from '../../utils/logger-utility';

type WorkoutScreenProps = {
  navigation: WorkoutScreenNavigationProp;
  route: {
    params: {
      itemId: string;
    };
  };
};

const logger = LoggerFactory('upsert-workout-screen');

const UpsertWorkoutScreen = ({ navigation, route }: WorkoutScreenProps) => {
  const appTheme = useAppTheme();
  const { currentUser } = useUserContext();
  const [selectedExercise, setSelectedExercise] = React.useState<
    ExerciseCardInfo | undefined
  >(undefined);
  const [ratingModalVisible, setRatingModalVisible] = React.useState(false);
  const { itemId } = route.params;

  useEffect(() => {
    flowResult(workoutDetailStore.fetchWorkout(itemId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCompletedWorkout = () => {
    // Handle metric endpoint
    navigation.goBack();
  };

  return workoutDetailStore.state === 'pending' ? (
    <Loader />
  ) : (
    <View
      className='flex-1'
      style={{ backgroundColor: appTheme.colors.background }}>
      <WorkoutHeader
        name={workoutDetailStore.workoutHeader.name}
        description={workoutDetailStore.workoutHeader.description}
      />
      <WorkoutInfo
        duration={workoutDetailStore.workoutHeader.duration}
        exerciseCount={workoutDetailStore.workoutHeader.exerciseCount}
        globalRating={workoutDetailStore.workoutHeader.rating.globalRating}
        onPressModal={() => setRatingModalVisible(true)}
      />
      <View
        className='mt-5'
        style={{
          backgroundColor: appTheme.colors.background,
          flex: 0.62,
        }}>
        {ratingModalVisible && (
          <WorkoutRatingModal
            onDismiss={() => setRatingModalVisible(false)}
            workoutRatingItem={workoutDetailStore.workoutHeader.rating}
          />
        )}

        <ItemCardList
          items={workoutDetailStore.exerciseCards}
          onPress={item => setSelectedExercise(item)}
        />

        {selectedExercise && (
          <ExerciseModal
            onDismiss={() => setSelectedExercise(undefined)}
            exerciseItem={selectedExercise}
          />
        )}
      </View>
      <View className='mb-10 mx-10' style={{ flex: 0.1 }}>
        <Button title='Completar' onPress={() => handleCompletedWorkout()} />
      </View>
    </View>
  );
};

export default observer(UpsertWorkoutScreen);