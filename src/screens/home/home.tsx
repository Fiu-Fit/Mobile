/* eslint-disable react-native/no-inline-styles */
import { View } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { useAppTheme, useUserContext } from '../../App';
import ItemCardList from '../../components/itemCardList';
import MetricCard from '../../components/metricCard';
import HomeHeader from '../../components/homeHeader.tsx';
import Button from '../../components/button';
import { workoutStore } from '../../stores/workout.store';
import { HomeNavigationProp } from '../../navigation/navigation-props';
import { observer } from 'mobx-react';
import { useFocusEffect } from '@react-navigation/native';
import { action } from 'mobx';
import { useCallback } from 'react';

const HomeScreen = ({ navigation }: { navigation: HomeNavigationProp }) => {
  const appTheme = useAppTheme();
  const { currentUser } = useUserContext();

  useFocusEffect(
    useCallback(() => {
      action(() => {
        workoutStore.fetchFavoriteWorkouts(`${currentUser.id}`);
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <View className='flex-1' style={{ backgroundColor: appTheme.colors.scrim }}>
      <View style={{ flex: 0.1 }}>
        <HomeHeader navigation={navigation} />
        <Divider className='mt-5' />
      </View>
      <View className='flex-row justify-around' style={{ flex: 0.2 }}>
        <MetricCard title={'Ejercicios'} value={'120'} />
        <MetricCard title={'Calorias'} value='12000' />
        <MetricCard title={'Minutos'} value='400' />
      </View>
      <View className='justify-center items-center' style={{ flex: 0.1 }}>
        <Text>Calendario</Text>
      </View>
      <View style={{ flex: 0.6, backgroundColor: appTheme.colors.background }}>
        <Divider />
        <Text className='self-center text-xl my-10'>
          Entrenamientos favoritos
        </Text>
        {workoutStore.workoutsCount > 0 ? (
          <ItemCardList
            items={workoutStore.workoutCardsInfo}
            onPress={item =>
              navigation.navigate('Workouts', {
                screen: 'WorkoutScreen',
                params: { itemId: item.id },
              })
            }
          />
        ) : (
          <View className='items-center mx-10'>
            <Text
              className='text-l mt-10'
              style={{ color: appTheme.colors.onSurface }}>
              Aún no tienes entrenamientos favoritos
            </Text>
            <Button
              title='Empezar a buscar'
              onPress={() => navigation.navigate('Workouts')}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default observer(HomeScreen);
