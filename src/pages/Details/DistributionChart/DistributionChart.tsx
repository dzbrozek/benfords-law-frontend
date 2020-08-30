import React from 'react';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLegend,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from 'victory';

import { DistributionChartProps } from './types';

const DistributionChart = ({
  colorScale,
  expectedData,
  actualData,
  labels,
}: DistributionChartProps): React.ReactElement => {
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      containerComponent={<VictoryVoronoiContainer />}>
      <VictoryAxis tickFormat={(x) => x} />

      <VictoryAxis dependentAxis tickFormat={(x) => `${x}%`} />

      <VictoryGroup
        offset={10}
        colorScale={colorScale}
        labelComponent={<VictoryTooltip />}>
        <VictoryBar barWidth={10} data={expectedData} />

        <VictoryBar barWidth={10} data={actualData} />
      </VictoryGroup>

      <VictoryLegend
        x={100}
        y={10}
        orientation="horizontal"
        gutter={20}
        colorScale={colorScale}
        data={labels.map((label) => ({ name: label }))}
      />
    </VictoryChart>
  );
};

export default DistributionChart;
