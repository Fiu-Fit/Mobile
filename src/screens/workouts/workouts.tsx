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

const WorkoutsScreen = ({
  navigation,
}: {
  navigation: WorkoutsScreenNavigationProp;
}) => {
  const appTheme = useAppTheme();
  const { currentUser } = useUserContext();
  useEffect(() => {
    workoutStore.fetchWorkouts();
  }, []);

  return (
    <View style={{ backgroundColor: appTheme.colors.background, flex: 1 }}>
      <NavBar navigation={navigation} />
      <ItemCardList
        items={workoutStore.cardsInfo}
        onPress={item =>
          navigation.push('WorkoutScreen', {
            itemId: item.id,
          })
        }
      />
      {currentUser.role !== Role.Athlete && (
        <FloatingActionButton
          onPress={() =>
            navigation.push('UpsertWorkoutScreen', { itemId: undefined })
          }
        />
      )}
    </View>
  );
};

export default observer(WorkoutsScreen);
