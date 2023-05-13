import { View } from 'react-native';
import { useAppTheme } from '../../App';
import ItemCardList from '../../components/itemCardList';
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
      <ItemCardList
        items={workoutStore.cardsInfo}
        onPress={item =>
          navigation.push('Workout', {
            itemId: item.id,
          })
        }
      />
    </View>
  );
};

export default observer(WorkoutsScreen);
