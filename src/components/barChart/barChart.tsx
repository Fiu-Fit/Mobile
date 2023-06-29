import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryAxis,
} from 'victory-native';
import COLORS from '../../constants/colors';
import { BarChartProps } from '../../utils/custom-types';

const BarChart = ({ data }: { data: BarChartProps }) => {
  console.log('BarChar: ', data);
  return (
    <VictoryChart theme={VictoryTheme.grayscale}>
      <VictoryAxis
        style={{
          axis: { stroke: '#E0F2F1' },
          axisLabel: { fontSize: 16, fill: '#E0F2F1' },
          ticks: { stroke: '#ccc' },
          tickLabels: { fontSize: 14, fill: '#E0F2F1', fontWeight: 'bold' },
          grid: { stroke: '#B3E5FC', strokeWidth: 0.25 },
        }}
        dependentAxis
      />
      <VictoryAxis
        style={{
          axis: { stroke: '#E0F2F1' },
          axisLabel: { fontSize: 16 },
          ticks: { stroke: '#ccc' },
          tickLabels: {
            fontSize: 10,
            fill: '#E0F2F1',
            fontWeight: 'bold',
            angle: -45,
          },
        }}
      />
      <VictoryBar
        data={data}
        x='label'
        y='value'
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 },
        }}
        style={{ data: { fill: COLORS.blue } }}
      />
    </VictoryChart>
  );
};

export default BarChart;
