import { FlatList } from 'react-native';
import { IExerciseCard } from '../exerciseCard/exerciseCard';
import ExerciseCard from '../exerciseCard';

interface ExerciseCardListProps {
  exercises: IExerciseCard[];
}
const ExerciseCardList = ({ exercises }: ExerciseCardListProps) => {
  return (
    <>
      <FlatList
        className='mt-5'
        data={exercises}
        renderItem={({ item }) => <ExerciseCard exerciseItem={item} />}
        keyExtractor={item => `exercise-card-${item.id}`}
      />
    </>
  );
};

export default ExerciseCardList;
