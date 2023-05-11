import { Text, View } from 'react-native';
import { useAppTheme } from '../../App';
import { WorkoutScreenNavigationProp } from '../../navigation/navigation-props';
import ExerciseCardList from '../../components/exerciseCardList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useEffect } from 'react';
import WorkoutRatingModal from '../../components/workoutRatingModal';
import { WorkoutDetailStore } from '../../stores/workoutDetail.store';
import { observer } from 'mobx-react';
import Loader from '../../components/loader';
import { flowResult } from 'mobx';
import { IExerciseCard } from '../../components/exerciseCard/exerciseCard';

const exercises: IExerciseCard[] = [
  {
    id: '1',
    name: 'Twist Ruso',
    description:
      'Siéntate en el suelo con las rodillas flexionadas, los pies ligeramente levantados y la espalda inclinada hacia atrás.\n\nA continuación, une las manos y gira de un lado a otro',
  },
  {
    id: '2',
    name: 'Escalada de Montaña',
    description: 'Description',
  },
  {
    id: '3',
    name: 'Toque al Talón',
    description: 'Description',
  },
  {
    id: '4',
    name: 'Elevaciones de Piernas',
    description: 'Description',
  },
  { id: '5', name: 'Tablón', description: 'Description' },
].map(exercise => ({ ...exercise, sets: '1', reps: '20', category: 'Abs' }));

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
      workoutId: string;
    };
  };
};

const WorkoutScreen = ({ navigation, route }: WorkoutScreenProps) => {
  const appTheme = useAppTheme();
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const { workoutId } = route.params;

  useEffect(() => {
    flowResult(workoutDetailStore.fetchWorkout(workoutId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return workoutDetailStore.state === 'pending' ? (
    <Loader />
  ) : (
    <View
      className='flex-1'
      style={{ backgroundColor: appTheme.colors.background }}>
      <View
        className='items-center justify-center'
        style={{ backgroundColor: appTheme.colors.background, flex: 0.2 }}>
        <Text
          className='text-4xl mt-10'
          style={{ color: appTheme.colors.text }}>
          {workoutDetailStore.workoutHeader.name}
        </Text>
        <Text className='text-lg' style={{ color: appTheme.colors.outline }}>
          {workoutDetailStore.workoutHeader.description}
        </Text>
      </View>
      <View
        className='flex-row items-center justify-between'
        style={{ backgroundColor: appTheme.colors.outlineVariant, flex: 0.08 }}>
        <Text className='text-lg ml-5' style={{ color: appTheme.colors.text }}>
          {workoutDetailStore.workoutHeader.duration} min -{' '}
          {workoutDetailStore.workoutHeader.exerciseCount} ejercicios
        </Text>
        <View className='flex-row justify-center'>
          <Text className='text-xl'>
            {workoutDetailStore.workoutHeader.globalRating}
          </Text>
          <Icon
            onPress={() => showModal()}
            style={{
              fontSize: 30,
              color: appTheme.colors.text,
              marginRight: 30,
              marginLeft: 5,
            }}
            name={'star'}
          />
        </View>

        <WorkoutRatingModal
          visible={visible}
          onDismiss={hideModal}
          workoutRatingItem={rating}
        />
      </View>
      <View
        style={{
          backgroundColor: appTheme.colors.background,
          flex: 0.72,
        }}>
        <ExerciseCardList exercises={exercises} />
      </View>
    </View>
  );
};

export default observer(WorkoutScreen);
