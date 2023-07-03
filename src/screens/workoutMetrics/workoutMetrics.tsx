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
          keyPrefix='metrics'
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