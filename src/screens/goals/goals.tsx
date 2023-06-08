import { View } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { GoalsScreenNavigationProp } from '../../navigation/navigation-props';
import { useAppTheme, useUserContext } from '../../App';
import ItemCardList from '../../components/itemCardList';
import FloatingActionButton from '../../components/dumb/floatingActionButton';
import { goalStore } from '../../stores/goal.store';
import { useFocusEffect } from '@react-navigation/native';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import { useCallback } from 'react';

const GoalsScreen = ({
  navigation,
}: {
  navigation: GoalsScreenNavigationProp;
}) => {
  const appTheme = useAppTheme();
  const { currentUser } = useUserContext();
  useFocusEffect(
    useCallback(() => {
      action(() => {
        goalStore.fetchGoals(currentUser.id);
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
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
export default observer(GoalsScreen);