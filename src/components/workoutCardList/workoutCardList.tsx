import { FlatList } from 'react-native';
import { IWorkoutCard } from '../workoutCard/workoutCard';
import WorkoutCard from '../workoutCard';
import { observer } from 'mobx-react';
import { WorkoutsScreenNavigationProp } from '../../navigation/navigation-props';

interface WorkoutCardListProps {
  workouts: IWorkoutCard[];
  navigation: WorkoutsScreenNavigationProp;
}
const WorkoutCardList = ({ workouts, navigation }: WorkoutCardListProps) => {
  return (
    <>
      <FlatList
        data={workouts}
        renderItem={({ item }) => (
          <WorkoutCard workoutItem={item} navigation={navigation} />
        )}
        keyExtractor={item => `workout-card-${item.id}`}
      />
    </>
  );
};

export default observer(WorkoutCardList);
