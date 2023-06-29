import { observer } from 'mobx-react';
import { View } from 'react-native';
import { useAppTheme } from '../../App';
import WorkoutFilterModal from '../../components/workoutFilterModal';
import WorkoutFilter from '../../components/workoutFilter';
import { useFocusEffect } from '@react-navigation/native';
import { action, runInAction } from 'mobx';
import { useCallback, useState } from 'react';
import LoggerFactory from '../../utils/logger-utility';
import { workoutDetailStore } from '../../stores/workoutDetail.store';
import {
  monthMap,
  workoutMetricYear,
  yearMap,
} from '../../utils/workout-types';
import BarChart from '../../components/barChart';
import { BarData } from '../../utils/custom-types';
import WorkoutHeader from '../../components/workoutHeader';
import { Divider, Text } from 'react-native-paper';

const WorkoutMetricsScreen = () => {
  const appTheme = useAppTheme();
  const logger = LoggerFactory('workout-metrics-screen');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [favoritesData, setFavoritesData] = useState<BarData[]>([]);
  const [averageRatingsData, setAverageRatingsData] = useState<BarData[]>([]);

  useFocusEffect(
    useCallback(() => {
      action(() => {
        logger.info('Getting workout metrics..');
        workoutDetailStore.fetchWorkoutMetrics();
        const { favorites, averageRatings } = setWorkoutMetricsData();
        setFavoritesData(favorites);
        setAverageRatingsData(averageRatings);
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const setWorkoutMetricsData = () => {
    const workoutMetrics = workoutDetailStore.metrics;
    const favorites: BarData[] = workoutMetrics.map((metric, index) => {
      const label = monthMap.get(index) || '';
      const frontColor = '#177AD5';
      const value = metric.favoriteCount;

      return { value, label, frontColor };
    });

    const averageRatings = workoutMetrics.map((metric, index) => {
      const label = monthMap.get(index) || '';
      const frontColor = '#23A7F3';
      const value = metric.averageRating;

      return { value, label, frontColor };
    });

    return { favorites, averageRatings };
  };

  // const setRatingValuesData = () => {

  //}
  const barData = [
    { value: 250, label: 'Enero', frontColor: '#177AD5' },
    { value: 500, label: 'Febrero', frontColor: '#177AD5' },
    { value: 745, label: 'Marzo', frontColor: '#177AD5' },
    { value: 320, label: 'Abril' },
    { value: 600, label: 'Mayo' },
    { value: 256, label: 'Junio' },
    { value: 300, label: 'Julio' },
    { value: 300, label: 'Agosto' },
    { value: 300, label: 'Septiembre' },
    { value: 300, label: 'Octubre' },
    { value: 300, label: 'Noviembre' },
    { value: 300, label: 'Diciembre' },
  ];

  return (
    <View style={{ backgroundColor: appTheme.colors.background, flex: 1 }}>
      {filterModalVisible && (
        <WorkoutFilterModal
          onDismiss={() => setFilterModalVisible(false)}
          onSelect={(filter: number | undefined) => {
            runInAction(() => {
              workoutDetailStore.selectedYearFilter = filter
                ? filter
                : new Date().getFullYear();
            });
            workoutDetailStore.fetchWorkoutMetrics();
          }}
          items={workoutMetricYear}
        />
      )}
      <View
        style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 40 }}>{workoutDetailStore.workout.name}</Text>
      </View>
      <View
        style={{ flex: 0.1, alignItems: 'center', justifyContent: 'center' }}>
        <WorkoutFilter
          iconName='calendar'
          text='Año'
          selectedFilter={
            yearMap.get(workoutDetailStore.selectedYearFilter as number) ||
            new Date().getFullYear().toString()
          }
          onPress={() => setFilterModalVisible(true)}
        />
      </View>
      <View
        style={{
          flex: 0.7,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 4,
        }}>
        <View style={{ flex: 0.1 }}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Cantidad de favoritos
          </Text>
        </View>
        <View style={{ flex: 0.9, marginTop: 10, backgroundColor: 'green' }}>
          <BarChart data={barData} />
        </View>
      </View>
    </View>
  );
};

export default observer(WorkoutMetricsScreen);
