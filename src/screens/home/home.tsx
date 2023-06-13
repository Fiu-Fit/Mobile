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
import { useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CalendarModal from '../../components/calendarModal';
import moment, { Moment } from 'moment';

type DatesState = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  displayedDate: Moment;
};

const HomeScreen = ({ navigation }: { navigation: HomeNavigationProp }) => {
  const appTheme = useAppTheme();
  const { currentUser } = useUserContext();
  const [showingCalendarModal, setShowingCalendarModal] = useState(false);
  const [dates, setDates] = useState<DatesState>({
    startDate: undefined,
    endDate: undefined,
    displayedDate: moment(),
  });

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
      {showingCalendarModal && (
        <CalendarModal
          onDismiss={() => dates.endDate && setShowingCalendarModal(false)}
          setDates={newDates => setDates(newDates)}
          dates={dates}
        />
      )}
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
        <TouchableOpacity onPress={() => setShowingCalendarModal(true)}>
          <Text>
            {dates.startDate !== undefined && dates.endDate !== undefined
              ? dates.startDate.toLocaleDateString() +
                '   ' +
                dates.endDate.toLocaleDateString()
              : 'Seleccionar periodo de tiempo'}
          </Text>
        </TouchableOpacity>
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
