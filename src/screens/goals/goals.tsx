import { View } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { HomeScreenNavigationProp } from '../../navigation/navigation-props';
import { useAppTheme } from '../../App';
import WorkoutCardList from '../../components/itemCardList';
import Button from '../../components/button';
import { GoalStore } from '../../stores/goals.store';
import ItemCardList from '../../components/itemCardList';
import AddButton from '../../components/addButton';

const goalsStore = new GoalStore();

const GoalsScreen = ({
  navigation,
}: {
  navigation: HomeScreenNavigationProp;
}) => {
  const appTheme = useAppTheme();

  return (
    <View className='flex-1' style={{ backgroundColor: appTheme.colors.scrim }}>
      <View className='justify-center' style={{ flex: 0.2 }}>
        <Text className='text-3xl self-center'>Mis metas</Text>
      </View>
      <View style={{ flex: 0.8, backgroundColor: appTheme.colors.background }}>
        <Divider />
        <ItemCardList
          items={goalsStore.cardsInfo}
          navigation={navigation}
          screen={'Goal'}
        />
      </View>
      <AddButton onPress={() => navigation.push('CreateGoal')} />
    </View>
  );
};

export default GoalsScreen;
