import MetricCard from '../metricCard';
import { progressStore } from '../../stores/progress.store';
import { observer } from 'mobx-react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import { View } from 'react-native';

interface MetricCardsProps {
  onPress: () => void;
}

const MetricCards = ({ onPress }: MetricCardsProps) => {
  return (
    <>
      <View className='items-center justify-center'>
        <TouchableOpacity
          className='justify-center items-center'
          onPress={onPress}>
          <Text className='text-3xl'>
            {Object.values(progressStore.progress.activityTypes)
              .reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0,
              )
              .toString()}
          </Text>
          <Text>Ejercicios</Text>
        </TouchableOpacity>
      </View>

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
