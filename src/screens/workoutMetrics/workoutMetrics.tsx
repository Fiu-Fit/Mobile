import { observer } from 'mobx-react';
import { View } from 'react-native';
import { useAppTheme } from '../../App';
import { WorkoutFilterModal } from '../../components/workoutFilterModal';
import WorkoutFilter from '../../components/workoutFilter';
import { useFocusEffect } from '@react-navigation/native';
import { action } from 'mobx';
import { useCallback, useState } from 'react';
import LoggerFactory from '../../utils/logger-utility';
import { workoutDetailStore } from '../../stores/workoutDetail.store';
import { workoutMetricYear, yearMap } from '../../utils/workout-types';

const WorkoutMetricsScreen = () => {
  const appTheme = useAppTheme();
  const logger = LoggerFactory('workout-metrics-screen')
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      action(() => {
        logger.info('Getting workout metrics..');
        workoutDetailStore.fetchWorkoutMetrics();
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <View style={{ backgroundColor: appTheme.colors.background, flex: 1 }}>
      <WorkoutFilter
        iconName='calendar'
        text='Año'
        selectedFilter={yearMap.get(selectedYear) || '2023'}
        onPress={() => setFilterModalVisible(true)}
      />
      <View style={{ flex: 0.8 }} />
    </View>
  );
};

export default observer(WorkoutMetricsScreen);
