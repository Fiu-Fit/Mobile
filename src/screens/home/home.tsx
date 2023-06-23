/* eslint-disable react-native/no-inline-styles */
import { View } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { useAppTheme, useUserContext } from '../../App';
import ItemCardList from '../../components/itemCardList';
import HomeHeader from '../../components/homeHeader.tsx';
import Button from '../../components/button';
import { workoutStore } from '../../stores/workout.store';
import { HomeNavigationProp } from '../../navigation/navigation-props';
import { observer } from 'mobx-react';
import { useFocusEffect } from '@react-navigation/native';
import { action } from 'mobx';
import { useCallback, useState, useEffect } from 'react';
import RangeCalendarModal from '../../components/rangeCalendarModal';
import { progressStore } from '../../stores/progress.store';
import ExerciseMetricsModal from '../../components/exerciseMetricsModal';
import MetricPeriodSelector from '../../components/metricPeriodSelector';
import MetricCards from '../../components/metricCards';
import {
  NotificationListener,
  requestPermissions,
} from '../../utils/push-notification-manager';

const HomeScreen = ({ navigation }: { navigation: HomeNavigationProp }) => {
  const appTheme = useAppTheme();
  const { currentUser } = useUserContext();
  const [showingCalendarModal, setShowingCalendarModal] = useState(false);
  const [showingExerciseMetricsModal, setShowingExerciseMetricsModal] =
    useState(false);

  useFocusEffect(
    useCallback(() => {
      action(() => {
        workoutStore.fetchFavoriteWorkouts(currentUser.id);
        progressStore.fetchProgress(currentUser.id);
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  useEffect(() => {
    requestPermissions(currentUser);
    NotificationListener();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View className='flex-1' style={{ backgroundColor: appTheme.colors.scrim }}>
      {showingCalendarModal && (
        <RangeCalendarModal
          onDismiss={() => {
            if (progressStore.endDate) {
              progressStore.fetchProgress(currentUser.id);
              setShowingCalendarModal(false);
            }
          }}
        />
      )}
      {showingExerciseMetricsModal && (
        <ExerciseMetricsModal
          onDismiss={() => setShowingExerciseMetricsModal(false)}
        />
      )}
      <View style={{ flex: 0.1 }}>
        <HomeHeader navigation={navigation} />
        <Divider className='mt-5' />
      </View>
      <View className='flex-row justify-around' style={{ flex: 0.2 }}>
        <MetricCards onPress={() => setShowingExerciseMetricsModal(true)} />
      </View>
      <View className='justify-center items-center' style={{ flex: 0.1 }}>
        <MetricPeriodSelector onPress={() => setShowingCalendarModal(true)} />
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
