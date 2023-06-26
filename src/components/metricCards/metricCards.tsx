import MetricCard from '../metricCard';
import { progressStore } from '../../stores/progress.store';
import { observer } from 'mobx-react';

const MetricCards = () => {
  return (
    <>
      <MetricCard
        title={'Ejercicios'}
        value={progressStore.progress.numberOfExercises.toString()}
      />

      <MetricCard
        title={'Calorias'}
        value={progressStore.progress.burntCalories.toString()}
      />
      <MetricCard
        title={'Minutos'}
        value={progressStore.progress.timeSpent.toString()}
      />
      <MetricCard
        title={'Distancia'}
        value={progressStore.progress.traveledDistance.toString()}
      />
    </>
  );
};

export default observer(MetricCards);
