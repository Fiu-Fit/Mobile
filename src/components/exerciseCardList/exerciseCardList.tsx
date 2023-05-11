import { FlatList } from 'react-native';
import ExerciseCard from '../exerciseCard';
import { IExerciseCard } from '../../utils/workout-types';

interface ExerciseCardListProps {
  exercises: IExerciseCard[];
}

const ExerciseCardList = ({ exercises }: ExerciseCardListProps) => {
  return (
    <>
      <FlatList
        className='mt-5 mb-4'
        data={exercises}
        renderItem={({ item }) => <ExerciseCard exerciseItem={item} />}
        keyExtractor={item => `exercise-card-${item.id}`}
      />
    </>
  );
};

export default ExerciseCardList;
