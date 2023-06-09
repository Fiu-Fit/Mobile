import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryAxis,
  VictoryGroup,
  VictoryLegend,
} from 'victory-native';
import { BarChartProps } from '../../utils/custom-types';
import { observer } from 'mobx-react';
 
const GroupedBarChart = ({ data }: { data: BarChartProps[] }) => {
  console.log('GroupedBarChart data: ', data);
  return (
    <VictoryChart theme={VictoryTheme.grayscale} height={550}>
      <VictoryLegend
        data={[
          { name: 'Terrible', labels: { fill: 'white' }},
          { name: 'Malo', labels: { fill: 'white' }},
          { name: 'Bueno', labels: { fill: 'white' }},
          { name: 'Muy bueno', labels: { fill: 'white' }},
          { name: 'Excelente', labels: { fill: 'white' }},
        ]}
        colorScale={'qualitative'}
        orientation='horizontal'
      />
      <VictoryGroup offset={6} colorScale={'qualitative'}>
        {data.map((item, index) => (
          <VictoryBar
            key={`bar-chart-${index}`}
            horizontal
            barWidth={4}
            data={item}
            x='label'
            y='value'
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
          />
        ))}
      </VictoryGroup>
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
    </VictoryChart>
  );
};

export default observer(GroupedBarChart);
