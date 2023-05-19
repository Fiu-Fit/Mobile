import { View } from 'react-native';
import { useAppTheme, useUserContext } from '../../App';
import ItemCardList from '../../components/itemCardList';
import NavBar from '../../components/navBar';
import { WorkoutsScreenNavigationProp } from '../../navigation/navigation-props';
import { observer } from 'mobx-react';
import { workoutStore } from '../../stores/workout.store';
import { useEffect } from 'react';
import FloatingActionButton from '../../components/dumb/floatingActionButton';
import { Role } from '../../constants/roles';
import { action } from 'mobx';
import WorkoutsSelector from '../../components/workoutsSelector';

const WorkoutsScreen = ({
  navigation,
}: {
  navigation: WorkoutsScreenNavigationProp;
}) => {
  const appTheme = useAppTheme();
  const { currentUser } = useUserContext();

  const onChangeShowingAll = action((isShowingAll: boolean): void => {
    workoutStore.showingAllWorkouts = isShowingAll;
  });

  useEffect(() => {
    workoutStore.fetchWorkouts();
  }, []);

  return (
    <View style={{ backgroundColor: appTheme.colors.background, flex: 1 }}>
      <NavBar />
      <WorkoutsSelector
        showingAllWorkouts={workoutStore.showingAllWorkouts}
        onPress={onChangeShowingAll}
      />
      <View style={{ flex: 0.8 }}>
        <ItemCardList
          items={workoutStore.workoutCardsInfo}
          onPress={item =>
            navigation.push('WorkoutScreen', {
              itemId: item.id,
            })
          }
        />
      </View>
      {currentUser.role !== Role.Athlete && (
        <FloatingActionButton
          onPress={() => navigation.push('UpsertWorkout')}
        />
      )}
    </View>
  );
};

export default observer(WorkoutsScreen);
