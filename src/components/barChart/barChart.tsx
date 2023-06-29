import { View } from 'react-native';
import { BarChart as RNBarChart } from 'react-native-gifted-charts';
import { VictoryChart, VictoryGroup, VictoryBar } from 'victory-native';

type BarChartProps = { label: string; value: number }[];

const BarChart = ({ data }: { data: BarChartProps }) => {
  return (
    <VictoryChart>
      <VictoryGroup>
        <VictoryBar data={data} style={{ data: { fill: 'blue' } }} />
      </VictoryGroup>
    </VictoryChart>
  );
};

export default BarChart;

// eslint-disable-next-line no-lone-blocks
{
  /*return (
  <RNBarChart
    barStyle={{ margin: 10 }}
    horizontal
    barWidth={20}
    noOfSections={3}
    barBorderRadius={4}
    frontColor='lightgray'
    data={data}
    yAxisThickness={0}
    xAxisThickness={0}
    width={550}
    height={100}
    hideRules
    isAnimated
    spacing={15}
  />
);
*/
}
