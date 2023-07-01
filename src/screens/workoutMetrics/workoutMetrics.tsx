/* eslint-disable no-lone-blocks */
/* eslint-disable react-native/no-inline-styles */
import { observer } from 'mobx-react';
import { View } from 'react-native';
import { useAppTheme } from '../../App';
import WorkoutFilterModal from '../../components/workoutFilterModal';
import WorkoutFilter from '../../components/workoutFilter';
import { useFocusEffect } from '@react-navigation/native';
import { runInAction } from 'mobx';
import { useCallback, useState } from 'react';
import LoggerFactory from '../../utils/logger-utility';
import { workoutDetailStore } from '../../stores/workoutDetail.store';
import { workoutMetricYear, yearMap } from '../../utils/workout-types';
import { Text } from 'react-native-paper';
import ChartSlider from '../../components/chartSlider/chartSlider';

const WorkoutMetricsScreen = () => {
  const appTheme = useAppTheme();
  const logger = LoggerFactory('workout-metrics-screen');
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      runInAction(() => {
        logger.info('Getting workout metrics..');
        workoutDetailStore.fetchWorkoutMetrics();
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

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
              workoutDetailStore.fetchWorkoutMetrics();
            });
          }}
          items={workoutMetricYear}
        />
      )}
      <View
        style={{ flex: 0.1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 40 }}>{workoutDetailStore.workout.name}</Text>
      </View>
      <View
        style={{
          flex: 0.1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
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
          flex: 0.8,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 4,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}>
          <ChartSlider
            favoritesData={workoutDetailStore.favoritesData}
            averageRatingsData={workoutDetailStore.averageRatingsData}
            ratingsData={workoutDetailStore.ratingsData}
          />
        </View>
      </View>
    </View>
  );
};

export default observer(WorkoutMetricsScreen);

{/*const favoriteBarData = [
  { value: 250, label: 'Enero' },
  { value: 500, label: 'Febrero' },
  { value: 745, label: 'Marzo' },
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

const ratingBarData = [
  { value: 100, label: 'Enero' },
  { value: 200, label: 'Febrero' },
  { value: 300, label: 'Marzo' },
  { value: 600, label: 'Abril' },
  { value: 600, label: 'Mayo' },
  { value: 256, label: 'Junio' },
  { value: 200, label: 'Julio' },
  { value: 300, label: 'Agosto' },
  { value: 150, label: 'Septiembre' },
  { value: 300, label: 'Octubre' },
  { value: 300, label: 'Noviembre' },
  { value: 300, label: 'Diciembre' },
];

const ratingTerribleBarData = [
  { value: 20, label: 'Enero' },
  { value: 30, label: 'Febrero' },
  { value: 10, label: 'Marzo' },
  { value: 12, label: 'Abril' },
  { value: 35, label: 'Mayo' },
  { value: 50, label: 'Junio' },
  { value: 21, label: 'Julio' },
  { value: 10, label: 'Agosto' },
  { value: 15, label: 'Septiembre' },
  { value: 30, label: 'Octubre' },
  { value: 32, label: 'Noviembre' },
  { value: 80, label: 'Diciembre' },
];

const ratingBadBarData = [
  { value: 20, label: 'Enero' },
  { value: 30, label: 'Febrero' },
  { value: 10, label: 'Marzo' },
  { value: 12, label: 'Abril' },
  { value: 35, label: 'Mayo' },
  { value: 50, label: 'Junio' },
  { value: 21, label: 'Julio' },
  { value: 10, label: 'Agosto' },
  { value: 15, label: 'Septiembre' },
  { value: 30, label: 'Octubre' },
  { value: 32, label: 'Noviembre' },
  { value: 80, label: 'Diciembre' },
];

const ratingGoodBarData = [
  { value: 10, label: 'Enero' },
  { value: 30, label: 'Febrero' },
  { value: 10, label: 'Marzo' },
  { value: 18, label: 'Abril' },
  { value: 70, label: 'Mayo' },
  { value: 50, label: 'Junio' },
  { value: 40, label: 'Julio' },
  { value: 50, label: 'Agosto' },
  { value: 15, label: 'Septiembre' },
  { value: 30, label: 'Octubre' },
  { value: 10, label: 'Noviembre' },
  { value: 20, label: 'Diciembre' },
];*/}