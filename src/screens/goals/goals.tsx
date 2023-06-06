import { View } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { GoalsScreenNavigationProp } from '../../navigation/navigation-props';
import { useAppTheme } from '../../App';
import ItemCardList from '../../components/itemCardList';
import FloatingActionButton from '../../components/dumb/floatingActionButton';
import { goalStore } from '../../stores/goal.store';

const GoalsScreen = ({
  navigation,
}: {
  navigation: GoalsScreenNavigationProp;
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
          items={goalStore.cardsInfo}
          onPress={item =>
            navigation.push('GoalScreen', {
              itemId: item.id,
            })
          }
        />
      </View>
      <FloatingActionButton
        onPress={() => navigation.push('CreateGoalScreen')}
      />
    </View>
  );
};

export default GoalsScreen;
