import { FlatList } from 'react-native';
import { IWorkoutCard } from '../workoutCard/workoutCard';
import WorkoutCard from '../workoutCard';

interface WorkoutCardListProps {
  workouts: IWorkoutCard[];
}
const WorkoutCardList = ({ workouts }: WorkoutCardListProps) => {
  return (
    <>
      <FlatList
        data={workouts}
        renderItem={({ item }) => <WorkoutCard workoutItem={item} />}
        keyExtractor={item => `workout-card-${item.id}`}
      />
    </>
  );
};

export default WorkoutCardList;
