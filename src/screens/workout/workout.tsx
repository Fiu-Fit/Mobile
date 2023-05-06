import { Alert, Text, View } from 'react-native';
import { useAppTheme } from '../../App';
import { WorkoutScreenNavigationProp } from '../../navigation/navigation-props';
import ExerciseCardList from '../../components/exerciseCardList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const exercises = [
  { id: 1, title: 'Twist Ruso', content: '00:20' },
  { id: 2, title: 'Escalada de Montaña', content: 'x16' },
  { id: 3, title: 'Toque al Talón', content: 'x20' },
  { id: 4, title: 'Elevaciones de Piernas', content: 'x16' },
  { id: 5, title: 'Tablón', content: '00:20' },
];

const workout = {
  name: 'Abdominales',
  description: 'Lorem ipsum dolor sit amet consect',
  duration: 40,
  difficulty: 3,
  category: 0,
  exercises: exercises,
  athleteIds: [],
  authorId: 4,
};

const WorkoutScreen = ({
  navigation,
}: {
  navigation: WorkoutScreenNavigationProp;
}) => {
  const appTheme = useAppTheme();
  return (
    <View
      className='flex-1'
      style={{ backgroundColor: appTheme.colors.background }}>
      <View
        className='items-center justify-center'
        style={{ backgroundColor: appTheme.colors.background, flex: 0.2 }}>
        <Text
          className='text-4xl mt-10'
          style={{ color: appTheme.colors.text }}>
          {workout.name}
        </Text>
        <Text className='text-lg' style={{ color: appTheme.colors.outline }}>
          {workout.description}
        </Text>
      </View>
      <View
        className='flex-row items-center justify-between'
        style={{ backgroundColor: appTheme.colors.outlineVariant, flex: 0.08 }}>
        <Text className='text-lg ml-5' style={{ color: appTheme.colors.text }}>
          {workout.duration} min - {workout.exercises.length} ejercicios
        </Text>
        <Icon
          onPress={() => Alert.alert('Hi')}
          style={{fontSize: 25, color: appTheme.colors.text, marginRight: 30}}
          name={'star'}
        />
      </View>
      <View
        style={{
          backgroundColor: appTheme.colors.inverseOnSurface,
          flex: 0.72,
        }}>
        <ExerciseCardList exercises={workout.exercises} />
      </View>
    </View>
  );
};

export default WorkoutScreen;
