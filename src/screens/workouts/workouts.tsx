import { View } from 'react-native';
import { useAppTheme } from '../../App';
import WorkoutCardList from '../../components/workoutCardList';
import NavBar from '../../components/navBar';
import { WorkoutsScreenNavigationProp } from '../../navigation/navigation-props';
import { observer } from 'mobx-react';
import { WorkoutStore } from '../../stores/workout.store';

const workoutsStore = new WorkoutStore();

const WorkoutsScreen = ({
  navigation,
}: {
  navigation: WorkoutsScreenNavigationProp;
}) => {
  const appTheme = useAppTheme();
  return (
    <View style={{ backgroundColor: appTheme.colors.background, flex: 1 }}>
      <NavBar navigation={navigation} />
      <WorkoutCardList workouts={workoutsStore.cardsInfo} />
    </View>
  );
};

export default observer(WorkoutsScreen);
