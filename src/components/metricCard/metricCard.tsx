import { View } from 'react-native';
import { Text } from 'react-native-paper';

const MetricCard = ({ title, value }: { title: string; value: string }) => {
  return (
    <View className='items-center justify-center'>
      <Text className='text-3xl'>{value}</Text>
      <Text>{title}</Text>
    </View>
  );
};

export default MetricCard;
