import { View } from 'react-native';
import { useAppTheme } from '../../App';
import { WorkoutScreenNavigationProp } from '../../navigation/navigation-props';
import React, { useEffect } from 'react';
//import WorkoutRatingModal from '../../components/workoutRatingModal';
import { WorkoutDetailStore } from '../../stores/workoutDetail.store';
import { observer } from 'mobx-react';
import Loader from '../../components/loader';
import { flowResult } from 'mobx';
import WorkoutHeader from '../../components/workoutHeader';
//import WorkoutInfo from '../../components/workoutInfo';
import Button from '../../components/button';
import ItemCardList from '../../components/itemCardList';
import ExerciseModal from '../../components/exerciseModal';
import { ExerciseCardInfo } from '../../utils/workout-types';

export interface IWorkoutRating {
  globalRating: number;
  comments: string[];
}

const rating = {
  globalRating: 4,
  comments: [
    '¡Wow! Realmente disfruté este entrenamiento. Los ejercicios fueron desafiantes y me encantó cómo trabajaron diferentes grupos musculares. ¡Definitivamente quiero hacerlo de nuevo!',
    '¡Increíble sesión de entrenamiento! Los ejercicios fueron variados y efectivos. Me encantó cómo pude sentir que mi cuerpo se fortalecía con cada movimiento. ¡Altamente recomendado!',
    'Qué gran entrenamiento. Los ejercicios fueron divertidos y me mantuvieron comprometido durante toda la sesión. Me encantó la combinación de fuerza y cardio. ¡Me siento enérgico y revitalizado!',
  ],
};

const workoutDetailStore = new WorkoutDetailStore();

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
  const [selectedExercise, setSelectedExercise] = React.useState<
    ExerciseCardInfo | undefined
  >(undefined);
  const { itemId } = route.params;

  useEffect(() => {
    flowResult(workoutDetailStore.fetchWorkout(itemId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      {/* <WorkoutInfo
        duration={workoutDetailStore.workoutHeader.duration}
        exerciseCount={workoutDetailStore.workoutHeader.exerciseCount}
        globalRating={workoutDetailStore.workoutHeader.globalRating}
        onPressModal={showModal}
      /> */}
      <View
        style={{
          backgroundColor: appTheme.colors.background,
          flex: 0.62,
        }}>
        {/* <WorkoutRatingModal
          visible={visible}
          onDismiss={hideModal}
          workoutRatingItem={rating}
        /> */}

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
        <Button title='Completar' onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

export default observer(WorkoutScreen);
