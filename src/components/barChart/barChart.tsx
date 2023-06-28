import { View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

const BarChart = () => {
  const barData = [
    { value: 250, label: 'Enero' },
    { value: 500, label: 'Febrero', frontColor: '#177AD5' },
    { value: 745, label: 'Marzo', frontColor: '#177AD5' },
    { value: 320, label: 'Abril' },
    { value: 600, label: 'Mayo', frontColor: '#177AD5' },
    { value: 256, label: 'Junio' },
    { value: 300, label: 'Julio' },
    { value: 300, label: 'Agosto' },
    { value: 300, label: 'Septiembre' },
    { value: 300, label: 'Octubre' },
    { value: 300, label: 'Noviembre' },
    { value: 300, label: 'Diciembre' },
  ];
  return (
    <View>
      <BarChart
        barWidth={22}
        noOfSections={3}
        barBorderRadius={4}
        frontColor='lightgray'
        data={barData}
        yAxisThickness={0}
        xAxisThickness={0}
      />
    </View>
  );
};

export default BarChart;
