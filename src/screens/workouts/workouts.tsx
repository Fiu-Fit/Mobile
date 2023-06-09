import { View } from 'react-native';
import { useAppTheme, useUserContext } from '../../App';
import ItemCardList from '../../components/itemCardList';
import { WorkoutsScreenNavigationProp } from '../../navigation/navigation-props';
import { observer } from 'mobx-react';
import { workoutStore } from '../../stores/workout.store';
import FloatingActionButton from '../../components/dumb/floatingActionButton';
import { Role } from '../../constants/roles';
import WorkoutsSelector from '../../components/workoutsSelector';
import WorkoutsFilter from '../../components/workoutsFilter';

const WorkoutsScreen = ({
  navigation,
}: {
  navigation: WorkoutsScreenNavigationProp;
}) => {
  const appTheme = useAppTheme();
  const { currentUser } = useUserContext();

  return (
    <View style={{ backgroundColor: appTheme.colors.background, flex: 1 }}>
      <WorkoutsFilter />
      <WorkoutsSelector />
      <View style={{ flex: 0.8 }}>
        <ItemCardList
          items={workoutStore.workoutCardsInfo}
          keyPrefix='workouts-workout-list'
          onPress={item =>
            navigation.push('WorkoutScreen', {
              itemId: item.id,
            })
          }
        />
      </View>
      {currentUser.role !== Role.Athlete && (
        <FloatingActionButton
          onPress={() =>
            navigation.push('UpsertWorkoutScreen', { itemId: undefined })
          }
          top={680}
        />
      )}
    </View>
  );
};

export default observer(WorkoutsScreen);
