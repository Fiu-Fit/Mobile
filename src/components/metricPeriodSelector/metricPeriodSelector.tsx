import { observer } from 'mobx-react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { progressStore } from '../../stores/progress.store';

interface MetricPeriodSelectorProps {
  onPress: () => void;
}

const MetricPeriodSelector = ({ onPress }: MetricPeriodSelectorProps) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <Text>
        {progressStore.startDate && progressStore.endDate
          ? progressStore.startDate.toLocaleDateString() +
            '  a  ' +
            progressStore.endDate.toLocaleDateString()
          : 'Seleccionar periodo de tiempo'}
      </Text>
    </TouchableOpacity>
  );
};

export default observer(MetricPeriodSelector);
