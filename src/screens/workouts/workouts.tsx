import { View } from 'react-native';
import { useAppTheme } from '../../App';
import WorkoutCardList from '../../components/workoutCardList';
import NavBar from '../../components/navBar';
import { WorkoutsScreenNavigationProp } from '../../navigation/navigation-props';
import { observer } from 'mobx-react';
import { workoutStore } from '../../stores/workout.store';
import { useEffect } from 'react';

const WorkoutsScreen = ({
  navigation,
}: {
  navigation: WorkoutsScreenNavigationProp;
}) => {
  const appTheme = useAppTheme();
  useEffect(() => {
    workoutStore.fetchWorkouts();
  }, []);

  return (
    <View style={{ backgroundColor: appTheme.colors.background, flex: 1 }}>
      <NavBar navigation={navigation} />
      <WorkoutCardList
        workouts={workoutStore.cardsInfo}
        navigation={navigation}
      />
    </View>
  );
};

export default observer(WorkoutsScreen);
